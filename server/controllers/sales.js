import OverallStat from "../models/OverallStack.js";

export const getSales = async (req,res) =>{
    try {
        const overallStats =await OverallStat.find();

        res.status(200).json(overallStats[0]);
    } catch (error) {
        res.status(404).json({massage:error.massage})
        
    }
}