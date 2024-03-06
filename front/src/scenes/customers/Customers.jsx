import React,{useState} from 'react'
import { useGetCustomersQuery } from '../../state/Api'
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { pink } from '@mui/material/colors';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

function Customers() {
    const [search,setSearch] = useState("");
    const [searchInput,setSearchInput] = useState("");
    const theme = useTheme();
    const { data,isLoading } = useGetCustomersQuery({search});
    console.log(data);
    const columns =[
        {
            field : "_id",
            headerName:"ID",
            flex:1,
        },{
            field : "name",
            headerName:"NAME",
            flex:0.5,
        },{
            field : "email",
            headerName:"Email",
            flex:1,
        },{
            field : "phoneNumber",
            headerName:"Phone Number",
            flex:0.5,
            renderCell: (params) =>{
                return params.value.replace(/^ (\d{3})(\d{3})(\d{4})/,"($1)$2-$3")
            }
        },{
            field : "country",
            headerName:"Country",
            flex:0.4,
        },{
            field : "occupation",
            headerName:"Occupation",
            flex:1,
        },{
            field : "role",
            headerName:"Role",
            flex:0.5,
        },
        
    ]
  return (
   <Box m="1.5rem 2.5rem">
    <Header title="CUSTOMERS" subtitle="List of Customers" />
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
        rows={data || []}
        columns={columns}
        pagination
        checkboxSelection
        components={{Toolbar:DataGridCustomToolbar}}
        componentsProps ={{
            toolbar:{searchInput,setSearchInput,setSearch}
        }}
        />
    </Box>
   </Box>
  )
}

export default Customers