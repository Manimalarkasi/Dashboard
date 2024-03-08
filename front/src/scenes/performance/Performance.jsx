
import React from 'react'
import { useGetUserPerformanceQuery } from '../../state/Api';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { pink } from '@mui/material/colors';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu';
import { useSelector } from 'react-redux';

function Performance() {
  const theme = useTheme();
//   const [search,setSearch] = useState("");
    // const [searchInput,setSearchInput] = useState("");
 const userId = useSelector((state) => state.global.userId)
  const {data,isLoading} = useGetUserPerformanceQuery(userId);
  console.log("data",data);
  const columns =[
    {
        field : "_id",
        headerName:"ID",
        flex:1,
    },{
        field : "userId",
        headerName:"USER ID",
        flex:1,
    },{
        field : "createdAt",
        headerName:"createdAt",
        flex:1,
    },{
        field : "products",
        headerName:"# of products",
        flex:0.5,
        sortable:false,
        renderCell: (params) =>params.value.length,
    },{
        field : "cost",
        headerName:"Cost",
        flex:1,
        renderCell:(params) => `$${Number(params.value).toFixed(3)}`
    },
    
]
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PERFORMANCE" subtitle="track your Affiliate Sales Performance heare" />
    
    <Box mt="40px" height="75vh" 
    sx={{
        "& .MuiDataGrid-root" : {
            border : "3px solid pink",
        },
        "& .MuiDataGrid-cell" : {
            borderBottom:"none",
        },
        "& .MuiDataGrid-columnHeaders" : {
           backgroundColor:theme.palette.background.alt,
           color:theme.palette.secondary[100],
           borderBottom:"none",
        },
        "& .MuiDataGrid-virtualScroller" : {
           backgroundColor:theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer" : {
            backgroundColor:theme.palette.background.alt,
            color:theme.palette.secondary[100],
            borderTop:"none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
            color:`${theme.palette.secondary[200]} !important`,
            borderTop:"none",
        },

    }}
    >
        <DataGrid 
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.sales) || []}
        columns={columns}
        pagination
        checkboxSelection
        // components={{
        //   Toolbar:DataGridCustomToolbar,
        // ColumnMenu:CustomColumnMenu}}
        // componentsProps ={{
        //     toolbar:{searchInput,setSearchInput,setSearch}
        // }}
        />
    </Box>
   </Box>
  )
}

export default Performance