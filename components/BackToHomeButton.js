import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa/index.js';

export default function BackToHomeButton() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Link 
        href="/" 
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:scale-105 transform"
      >
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
} 