import React from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  const Icon = {
    success: FiCheck,
    error: FiAlertCircle,
    info: FiAlertCircle,
  }[type];

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-md shadow-md flex items-center justify-between`}>
      <div className="flex items-center">
        <Icon className="mr-2" size={20} />
        <p>{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 focus:outline-none">
        <FiX size={20} />
      </button>
    </div>
  );
};

export default Toast;