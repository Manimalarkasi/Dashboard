import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useGetTransactionsQuery } from '../../state/Api';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar'

function Transaction() {
    const theme = useTheme();

//valuse to be send to backend
    const [page,setPage] = useState(0);
    const [pageSize,setPageSize] = useState(20);
    const [sort,setSort] = useState({});
    const [search,setSearch] = useState("");
    const [searchInput,setSearchInput] = useState("");


    const {data,isLoading} = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    })
    console.log("data",data)

    const columns =[
        {
            field : "_id",
            headerName:"ID",
            flex:1,
        },{
            field : "userId",
            headerName:"User ID",
            flex:1,
        },{
            field : "createdAt",
            headerName:"createdAt",
            flex:1,
        },{
            field : "products",
            headerName:"# of Products",
            flex:0.5,
            sortable : false,
            renderCell : (params) => params.value.length
        },{
            field : "cost",
            headerName:"Cost",
            flex:1,
            renderCell:(params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];
  return (
    <Box m="2.5rem 2.5rem">
        <Header title="TRANSACTION" subtitle="Entire list of Transaction" />
        <Box height="80vh"
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
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOption={[20,50,100]}
            pagination
            checkboxSelection
            page={page}
            pageSize={pageSize}
            paginationMode='server'
            sortingMode='server'
            onPageChange={(newPage) =>setPage(newPage)}
            onPageSizeChange = {(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel)=>setSort(...newSortModel)}
            components={{Toolbar:DataGridCustomToolbar}}
            componentsProps ={{
                toolbar:{searchInput,setSearchInput,setSearch}
            }}
            />
        </Box>
    </Box>
  )
}

export default Transaction