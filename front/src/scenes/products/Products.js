import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { useGetProductsQuery } from '../../state/Api';




const Product = ({
    _id,
    name,
    price,
    description,
    category,
    rating,
    supply,
    stat,
}) => {
    const theme = useTheme();
    const [isExpanded ,setIsExpanded ] = useState(false);

    return (
        <Card sx={{backgroundImage:"none",backgroundColor:theme.palette.background.alt, borderRadius:"0.55rem"}}>
            <CardContent>
                <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant='h5' component="div">
                    {name}
                </Typography>
                <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='primary' size='small' onClick={()=>setIsExpanded(!isExpanded)}> see more</Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{color:theme.palette.neutral[300]}}>
            <CardContent>
                <Typography>id:{_id}</Typography>
                <Typography>Supply Left:{supply}</Typography>
                <Typography>Yearly Sales Total:{stat.YearlySalesTotal}</Typography>
                <Typography>Yearly Units This Year:{stat.yearlyTotalSoldUnits}</Typography>
                
            </CardContent>
            </Collapse>
        </Card>
    )
}
function Products() {
    const { data, isloading } = useGetProductsQuery();
    // console.log("data",data)
    
    const isNonMobile = useMediaQuery("(min-width:900px)");
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle='See your list of products' />
        {data || !isloading  ? (
        <Box
         mt="20px" 
         display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))" 
          justifyContent="space-between" 
          rowGap="20px"
           columnGap="1.33%" 
        //    sx= {{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}  }} 
           >
            {/* page,pageSize,sort,search */}
            {data.map(({ _id,name,price,description, category,rating,supply,stat})=> (
               <Product 
            //    {...Product}
               key={_id}
               _id = {_id}
               name ={name}
               price={price}
               description={description}
               category={category}
               rating={rating}
               supply={supply}
               stat={stat}
                />

            ))}
           </Box>
        ) :(
        <>Loading..........</>
        )}
    </Box>
  )
}

export default Products