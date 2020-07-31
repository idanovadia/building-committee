module.exports = {
    test : async(req,res,next)=>{
        try{
            return res.status(200).json({
                message: "Successfully worked",
            });
        }catch(err){
            return res.status(500).json({
                message: 'Failed'
            });
        }
    },
}