 // let intervalId;
import React, { useEffect } from 'react';

let hasAlerted = false;
function TimeAlert({ data }){
    const checkTime = (data) => {
        data.forEach(row => {
            const currentTime = new Date();
            const rowTime = new Date(row.submittime);
            const differenceInMinutes = (currentTime - rowTime) / (1000 * 60);
    
            if (differenceInMinutes > 1 && !hasAlerted) {
                alert('Time exceeded by 5 minutes for entry: ' + row.id);
                const audio = new Audio('/sound/warning.mp3');
                audio.play();
                hasAlerted = true;
            }
        });
    };



    checkTime();

    const intervalId = setInterval(() => {
        hasAlerted = false;  // Reset the flag
        window.location.reload();
    }, 1 * 60 * 1000);  

    return () => clearInterval(intervalId);  // Cleanup on component unmount.
}
export default TimeAlert;