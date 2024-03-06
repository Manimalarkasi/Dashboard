import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import Header from '../../components/Header';
import OverviewChart from '../../components/OverviewChart';

function Overview() {
    const [view,setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="OVERVIEW" subtitle="Overview revenue and profit" />
        <Box height="75vh">
            <FormControl sx={{mt:"1rem"}} >
                <InputLabel >view</InputLabel>
                <Select value={view} label="view" onChange={(e)=>setView(e.target.value)} >
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="units">Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart />
        </Box>
    </Box>
  )
}

export default Overview