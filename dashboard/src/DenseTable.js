import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Divider,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoveToInProgressButton from './MoveToInProgress'; 



function DenseTable({ url , command, button_visiblity,time_check }) {

    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [hasAlerted, setHasAlerted] = useState(false);

    const handleOpenDialog = (item) => {
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedItem(null);
    };
    
    const autoRefresh=()=>{
      window.location = window.location.href;
    }

    const checkTime = () => {
      if (hasAlerted) return;  
  
      data.forEach(row => {
          const currentTime = new Date();
          const rowTime = new Date(row.submittime);
          const differenceInMinutes = (currentTime - rowTime) / (1000 * 60);
  
          if (differenceInMinutes > 1 && !hasAlerted) {
              alert('Time exceeded by 1 minutes for Order: ' + row.id);
              const audio = new Audio('/sound/warning.mp3');
              // audio.play(); //too noisy
              setHasAlerted(true);  
          }
      });
  };

    useEffect(() => {

       fetch(url)
    .then((response) => response.json())
    .then((fetchedData) => {
        setData(fetchedData);
        
        if (time_check && !hasAlerted) {
            checkTime();
        }
    })
    .catch((error) => console.error("There was an error fetching data:", error));



      console.log('Setting up the interval');
      setInterval(autoRefresh, 1 * 60 * 1000);
      const intervalId = setInterval(() => {
          setHasAlerted(false); 
          window.location.reload(true);
      }, 1 * 10 * 1000);  
  
      return () => clearInterval(intervalId);  
  
    });
    
    return (
        
    <TableContainer component={Paper}>

      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Amount</TableCell>
            {/* <TableCell>Details</TableCell> */}
            <TableCell>Submit Time</TableCell>
            <TableCell>Delivery Method</TableCell>
            <TableCell>Inspect Details</TableCell> 
            {button_visiblity &&<TableCell>Move</TableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.payment_method}</TableCell>
              <TableCell> ${item.amount}</TableCell>
              {/* <TableCell>{item.details_text}</TableCell> */}
              <TableCell>{item.submittime}</TableCell>
              <TableCell>{item.delivery_method}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog(item)}>Inspect</Button> 
              </TableCell>
              {button_visiblity && <TableCell>
                <MoveToInProgressButton command={command} itemId={item.id} />
              </TableCell>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle> Order ID: {selectedItem?.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
          </DialogContentText>
          <Divider />
          <DialogContentText>
            Special Requests: <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
            {selectedItem?.details_text}{selectedItem?.details_text}{selectedItem?.details_text} <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default DenseTable;
