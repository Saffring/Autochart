import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ease-out duration-300">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg transform transition-all duration-300 scale-105">
        <div className="flex items-center mb-4">
          <FiAlertCircle className="text-yellow-500 mr-3" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="mb-6 text-gray-700 text-sm">
          {message}
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 shadow-sm"
            style={{ width: '48%' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full px-5 py-3 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ width: '48%', background: "linear-gradient(to right, #6F46F1, #663DF3, #6940F1)" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
