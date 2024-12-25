import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-600 hover:text-gray-800 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm transition-colors"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
  );
}