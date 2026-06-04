import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import './ForceUpdateButton.css';

function ForceUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleForceUpdate = async () => {
   
    setIsUpdating(true);
    
     
    const confirmUpdate = window.confirm(
      'This will clear all cached data and reload the app. Continue?'
    );
    
    if (!confirmUpdate) {
       
      setIsUpdating(false);
      return;
    }

    try {
       
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('All caches cleared');
      }
      
       
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
        console.log('Service workers unregistered');
      }
      
       
      window.location.reload();
    } catch (error) {
      console.error('Force update failed:', error);
      alert('Update failed. Please try again or reinstall the app.');
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleForceUpdate}
      className="force-update-btn"
      disabled={isUpdating}
      title="Force Update App"
      aria-label="Force update app"
    >
      <RefreshCw
        size={24}
        className={isUpdating ? 'spinning' : ''}
      />
    </button>
  );
}

export default ForceUpdateButton;