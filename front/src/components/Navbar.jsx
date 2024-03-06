import React, { useState } from 'react'
import { LightModeOutlined,DarkModeOutlined,Menu as MenuIcon ,Search,SettingsOutlined,ArrowDropDownOutlined} from '@mui/icons-material';
import FlexBetween from './FlexBtween';
import { useDispatch } from 'react-redux';
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import { setMode } from '../state';
import { Icon } from 'semantic-ui-react';




function Navbar({ user,isSidebarOpen,setIsSidebarOpen,}) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl,setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleclick = (e)=> setAnchorEl(e.currentTarget);
    const handleclose = () => setAnchorEl(null);


  return (
    <AppBar sx={{position:"static",background:"none",boxShadow:"none"}}>
         <Toolbar sx={{justifyContent:"space-between"}}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                 backgroundColor={theme.palette.background.alt}
                 borderRadius="9px"
                 gap="3rem"
                 p="0.1rem 1.5rem"
                 >
                    <InputBase placeholder='Search......' />
                    <IconButton> <Search /> </IconButton>
                </FlexBetween>
            </FlexBetween>
            
            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={()=>dispatch(setMode())} >
                    {theme.palette.mode ==="dark" ? (
                        <DarkModeOutlined sx={{fontSize:'25px'}} />
                    ) : (
                        <LightModeOutlined sx={{fontSize:'25px'}} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize:'25px'}} />
                </IconButton>
                <FlexBetween>
                    <Button onClick={handleclick} sx={{display:'flex',justifyContent:'space-between',alignItems:"center",textTransform:"none",gap:'1rem'}}>
                    <Box
                     component="img"
                     alt='profile'
                     src='image/g6.jpg'
                     height="32px"
                     width="32px"
                     borderRadius="50px"
                     sx={{objectFit:"cover"}} />
                 <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>
                                {user.name}
                            </Typography>
                            <Typography fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}}>
                                {user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{color:theme.palette.secondary[300],fontSize:'25px',}} />
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleclose} anchorOrigin={{vertical:'bottom' , horizontal:'center'}} >
                        <MenuItem onClick={handleclose}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
         </Toolbar>
    </AppBar>
  )
}

export default Navbar