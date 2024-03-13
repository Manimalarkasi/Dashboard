import mongoose from 'mongoose';
import User from '../models/User.js';
import schema from  '../models/Schema.js';
import Transaction from '../models/Transaction.js';

export const getAdmins = async(req,res) => {
    try {
        const { search =""} = req.query;
        const admin = await User.find({
            role:"admin",
            $or : [
                {name : { $regex: new RegExp(search, "i") } },
                {userId : {$regex: new RegExp(search,"i") } }
            ],
        }).select("-password");

        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({massage:error.massage})
    }
}


// export const getUserPerformance = async (req,res) => {
//     try {
//         const { search =""} = req.query;
//         const {id} = req.params;
//         const userWithStats = await User.find({
//             role:"admin",
//             $or : [
//                 {name : { $regex: new RegExp(search, "i") } },
//                 {userId : {$regex: new RegExp(search,"i") } }
//             ],
//         })
//         .aggregate([
//             { $match : {_id :new mongoose.Types.ObjectId(id)}},
//             {
//                 $lookup:{
//                     from:"affiliatestats",
//                     localField: "_id",
//                     foreignField:"userId",
//                     as:"affiliateStats",
//                 },
//             },
//             { $unwind: "$affiliateStats"},
//         ])
//         .select("-password");


//         const salesTransactions = await Promise.all(
//             userWithStats[0].affiliateStat.affiliateSales.map((id)=>{
//                 return Transaction.findById(id)
//             })
//         );
//         const filteredSaleTransactions = salesTransactions.filter(
//             (transaction) => transaction !== null
//         );
        


//         res.status(200).json({user: userWithStats[0], sales:filteredSaleTransactions});
//     } catch (error) {
//         res.status(404).json({massage:error.massage})
        
//     }
// };


export const getUserPerformance = async (req,res) => {
    try {
        const { id } = req.params;
        const userWithStats = await User.aggregate([
            { $match : { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup:{
                    from:"affiliatestats",
                    localField: "_id",
                    foreignField:"userId",
                    as:"affiliateStats",
                },
            },
            { $unwind: "$affiliateStats"},
        ]);
       
        const salesTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id)=>{
                return Transaction.findById(id)
            })
        );
        const filteredSaleTransactions = salesTransactions.filter(
            (transaction) => transaction !== null
        );
        
        res.status(200).json({user: userWithStats[0], sales:filteredSaleTransactions});
    } catch (error) {
        res.status(404).json({massage:error.massage})
        
    }
};