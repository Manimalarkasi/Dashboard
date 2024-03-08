import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBtween'

function StatBox({ title, value, increase, icon, description}) {
    const theme = useTheme();

  return (
    <Box gridColumn="span 2"
     gridRow="span 1"
     display="flex"
     flexDirection="column"
     justifyContent="space-around"
     p="1.5rem 1rem"
     flex="1 1 100%"
     backgroundColor={theme.palette.background.alt}
     borderRadius="0.55ren"
     >
        <FlexBetween>
            <Typography variant='h6' sx={{color:theme.palette.secondary[100]}} >
                {title}
            </Typography>
            {icon}
        </FlexBetween>

        <Typography variant='h3' fontWeight="600" sx={{color:theme.palette.secondary.light}}>
            {increase}
        </Typography>
        <Typography>
            {description}
        </Typography>
     </Box>
  )
}

export default StatBox