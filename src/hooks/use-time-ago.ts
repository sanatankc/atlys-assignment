import { useState, useEffect } from 'react';

export function useTimeAgo(timestamp: string) {
  const [timeAgo, setTimeAgo] = useState('');

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    }
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  useEffect(() => {
    setTimeAgo(formatTimeAgo(timestamp));

    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(timestamp));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
} 