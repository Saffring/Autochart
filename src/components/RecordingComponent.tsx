"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, StopCircle, Clipboard, Loader } from "lucide-react";
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION
});

type TranscriptionService = "AWS" | "GCP" | "Hugging Face" | "Open AI";

interface TranscriptionResult {
    text: string;
    executionTime: number;
    isLoading: boolean;
}

interface EnhancedAudioVisualizerProps {
    isRecording: boolean;
    recordingDuration: number;
}

const EnhancedAudioVisualizer: React.FC<EnhancedAudioVisualizerProps> = ({ isRecording }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let audioContext: AudioContext | undefined;
        let analyser: AnalyserNode | undefined;
        let dataArray: Uint8Array | undefined;
        let source: MediaStreamAudioSourceNode | undefined;

        const initializeAudio = async () => {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        const drawVisualizer = () => {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            if (isRecording && analyser && dataArray) {
                analyser.getByteFrequencyData(dataArray);
                const barWidth = (WIDTH / dataArray.length) * 2.5;
                let x = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const barHeight = dataArray[i] / 2;

                    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
                    gradient.addColorStop(0, '#4287f5');
                    gradient.addColorStop(1, '#cc66ff');

                    ctx.fillStyle = gradient;
                    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                    x += barWidth + 1;
                }
            } else {
                ctx.beginPath();
                ctx.moveTo(0, HEIGHT / 2);
                ctx.lineTo(WIDTH, HEIGHT / 2);
                ctx.strokeStyle = '#4287f5';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            animationRef.current = requestAnimationFrame(drawVisualizer);
        };

        if (isRecording) {
            initializeAudio().then(() => {
                drawVisualizer();
            });
        } else {
            drawVisualizer();
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [isRecording]);

    return (
        <div className="relative w-full h-48 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" width={800} height={200} />
            <div className="absolute top-2 left-2 bg-gray-100 bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {isRecording ? 'Recording...' : 'Start'}
            </div>
        </div>
    );
};

export default function Component() {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [results, setResults] = useState<Record<TranscriptionService, TranscriptionResult>>({
        AWS: { text: "", executionTime: 0, isLoading: false },
        GCP: { text: "", executionTime: 0, isLoading: false },
        "Hugging Face": { text: "", executionTime: 0, isLoading: false },
        "Open AI": { text: "", executionTime: 0, isLoading: false },
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        resetRecording();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                setAudioBlob(blob);
                transcribeAudio(blob);
            };

            mediaRecorder.start();
            setIsRecording(true);

            timerRef.current = setInterval(() => {
                setRecordingDuration((prev) => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRecording(false);
    };

    const resetRecording = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setRecordingDuration(0);
        chunksRef.current = [];
    };

    const transcribeAudio = async (blob: Blob) => {
        try {
            setResults(prevResults => ({
                ...prevResults,
                "Open AI": { ...prevResults["Open AI"], isLoading: true },
                "Hugging Face": { ...prevResults["Hugging Face"], isLoading: true },
                "AWS": { ...prevResults["AWS"], isLoading: true },
                "GCP": { ...prevResults["GCP"], isLoading: true },
            }));

            const openAiText = await transcribeWithOpenAI(blob);
            const hfText = await transcribeWithHuggingFace(blob);

            setResults(prevResults => ({
                ...prevResults,
                "Open AI": { text: openAiText, executionTime: 1.8, isLoading: false },
                "Hugging Face": { text: hfText, executionTime: 2.1, isLoading: false },
                "AWS": { ...prevResults["AWS"], isLoading: false },
                "GCP": { ...prevResults["GCP"], isLoading: false },
            }));
        } catch (error) {
            console.error("Transcription failed:", error);
            setResults(prevResults => ({
                ...prevResults,
                "Open AI": { ...prevResults["Open AI"], isLoading: false },
                "Hugging Face": { ...prevResults["Hugging Face"], isLoading: false },
                "AWS": { ...prevResults["AWS"], isLoading: false },
                "GCP": { ...prevResults["GCP"], isLoading: false },
            }));
        }
    };

    const uploadToS3 = async (blob: Blob): Promise<string> => {
        const s3 = new AWS.S3();
        const params: AWS.S3.PutObjectRequest = {
            Bucket: "autochart-recording",
            Key: `audio-files/${Date.now()}.wav`,
            Body: blob,
            ContentType: 'audio/wav',
        };

        try {
            const data = await s3.upload(params).promise();
            return data.Location;
        } catch (err) {
            console.error("Error uploading to S3:", err);
            throw new Error("Failed to upload the file to S3");
        }
    };

    const transcribeWithOpenAI = async (blob: Blob): Promise<string> => {
        const s3Url = await uploadToS3(blob);
        const response = await fetch(s3Url);
        const audioBlob = await response.blob();
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        formData.append('model', 'whisper-1');

        const apiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: formData,
        });

        const data = await apiResponse.json();
        return data.text || "Transcription failed or returned no text.";
    };

    const transcribeWithHuggingFace = async (blob: Blob): Promise<string> => {
        const s3Url = await uploadToS3(blob);
        const response = await fetch(s3Url);
        const audioBlob = await response.blob();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const apiResponse = await fetch('https://api-inference.huggingface.co/models/facebook/wav2vec2-large-960h', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
                'Content-Type': 'audio/wav',
            },
            body: arrayBuffer,
        });
        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error("Hugging Face API error:", errorData);
            throw new Error(`Hugging Face API error: ${JSON.stringify(errorData)}`);
        }
        const data = await apiResponse.json();
        return data.text || "Transcription failed or returned no text.";
    };

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Text copied to clipboard!");
        }).catch((err) => {
            console.error("Failed to copy text: ", err);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-200 text-gray-800 p-4 mt-24">
            <div className="container mx-auto max-w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Healthcare AI Transcription Comparison</h1>
                <div className="mb-6">
                    <EnhancedAudioVisualizer isRecording={isRecording} recordingDuration={recordingDuration} />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`px-6 py-3 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            } text-white shadow-lg`}
                    >
                        {isRecording ? <StopCircle className="mr-2" /> : <Mic className="mr-2" />}
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>

                    <div className="text-2xl font-mono text-blue-900">{recordingDuration}s</div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {(Object.keys(results) as TranscriptionService[]).map((service) => (
                        <Card
                            key={service}
                            className="border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg"
                        >
                            <CardHeader className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 rounded-t-lg flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="text-white font-bold text-xl flex items-center gap-2">
                                        {service}
                                    </span>
                                </div>
                                <div className="text-sm font-normal bg-white text-blue-800 py-1 px-4 rounded-full shadow-lg hover:bg-blue-200 transition duration-300 ease-in-out">
                                    {results[service].executionTime}s
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 relative">
                                <div className="h-48 overflow-auto mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner hover:shadow-md transition-all duration-300 ease-in-out">
                                    {results[service].isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <Loader className="w-8 h-8 animate-spin text-blue-500" />
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-lg font-medium">
                                            {results[service].text || "Transcription will appear here"}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleCopyText(results[service].text || "Transcription will appear here")}
                                    className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 transition-colors duration-200"
                                    aria-label="Copy text"
                                >
                                    <Clipboard className="w-6 h-6" />
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}