import mongoose from 'mongoose';


const ProductStatSchema = new mongoose.Schema({
    ProdectId:String,
    YearlySalesTotal:Number,
    yearlyTotalSoldUnits:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            TotalSales:Number,
            totalUnits:Number,
        }
    ] ,
    dailyData:[
        {
        date:String,
        TotalSales:Number,
        totalUnits:Number,
    },
],
},
{
    timestamps:true
}
);

const ProductStat =mongoose.model("ProductStat",ProductStatSchema)
export default ProductStat;