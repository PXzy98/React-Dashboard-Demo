import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DenseTable from '../DenseTable';
import { useState, useEffect } from 'react';
import {  AppBar,Drawer,ListItem, ListItemText } from '@mui/material';

const drawerWidth = 240;

const defaultTheme = createTheme();

export default function Dashboard() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Unchecked');
  
  const toggleDrawer = (open) => () => {
      setIsDrawerOpen(open);
  };
  
  const handleListItemClick = (item) => {
      setSelectedOption(item);
      setIsDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <div>
      
      <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Order Details
          </Typography>

        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {['Unchecked', 'In Progress', 'Completed'].map((text) => (
            <ListItem button key={text} onClick={() => handleListItemClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{
        backgroundColor: 'primary.dark',
      }} style={{ padding: 20 }}>

        {selectedOption === 'Unchecked' && 
          <div> 
            <Box style={{ paddingBottom: 5 }}> 
              <h3>Unchecked Orders</h3>
            </Box>
            <DenseTable url= {'http://192.168.0.11:3001/getData1'} command={'http://192.168.0.11:3001/moveToInProgress/'} button_visiblity= {true} time_check={true}/>
          </div>
        }
        {selectedOption === 'In Progress' && 
          <div> 
            <Box style={{ paddingBottom: 5 }}> 
              <h3>In Progress Orders</h3>
            </Box>
            <DenseTable url= {'http://192.168.0.11:3001/getData2'} command={'http://192.168.0.11:3001/moveToCompleted/'} button_visiblity= {true} time_check={false}/>
          </div>
        }
        {selectedOption === 'Completed' && 
          <div> 
          <Box style={{ paddingBottom: 5 }}> 
            <h3>Completed Orders</h3>
          </Box>
          <DenseTable url= {'http://192.168.0.11:3001/getData3'} button_visiblity= {false} time_check={false}/>
        </div>
        }
      </Box>
            
    </div>
    </ThemeProvider>  
  );


}
