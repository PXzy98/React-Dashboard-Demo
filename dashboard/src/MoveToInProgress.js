import React, { useState } from 'react';
import { Button , Alert , Snackbar }from '@mui/material';
import axios from 'axios';

function MoveToInProgressButton({ itemId , command }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        window.location.reload();
    };

    const handleMoveToInProgress = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${command}${itemId}`);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error moving item . ' + error);
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    return (
        <div>
            
            <Button variant="outlined" color="secondary" onClick={handleMoveToInProgress} disabled={loading}>
                Clear
            </Button>
  
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={message.startsWith('Error') ? "error" : "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default MoveToInProgressButton;