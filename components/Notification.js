import { useState, useEffect } from 'react';

/**
 * Notification component for displaying alerts
 * @param {Object} props - Component props
 * @param {string} props.type - Notification type: 'success', 'error', 'warning', 'info'
 * @param {string} props.message - Message to display
 * @param {boolean} props.show - Whether to show the notification
 * @param {function} props.onClose - Function to call when notification is closed
 * @param {number} props.duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @returns {JSX.Element}
 */
export default function Notification({ 
  type = 'info', 
  message, 
  show, 
  onClose,
  duration = 5000 
}) {
  const [isVisible, setIsVisible] = useState(show);
  
  // Handle show prop changes
  useEffect(() => {
    setIsVisible(show);
  }, [show]);
  
  // Auto-dismiss timer
  useEffect(() => {
    let timer;
    
    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  // Define styles based on notification type
  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900',
      border: 'border-green-500',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-500'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900',
      border: 'border-red-500',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-500'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900',
      border: 'border-yellow-500',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-500'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900',
      border: 'border-blue-500',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500'
    }
  };
  
  const currentStyle = styles[type] || styles.info;
  
  // Icons for different notification types
  const icons = {
    success: (
      <svg className={`h-5 w-5 ${currentStyle.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className={`h-5 w-5 ${currentStyle.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className={`h-5 w-5 ${currentStyle.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className={`h-5 w-5 ${currentStyle.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 000-2H9z" clipRule="evenodd" />
        <path d="M9.75 13.5a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v2.25h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2.25z" />
      </svg>
    )
  };

  return (
    <div className={`fixed top-4 right-4 max-w-md z-50 ${currentStyle.bg} border-l-4 ${currentStyle.border} p-4 shadow-md rounded animate-fade-in-down`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${currentStyle.text}`}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={handleClose}
              className={`inline-flex ${currentStyle.icon} hover:bg-opacity-20 hover:bg-gray-500 rounded-md focus:outline-none p-1.5`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 