module.exports = {

    auth : async(req,res,next)=>{
        try{
            return res.status(200).json({
                massage: "Auth Success",
            });
        }catch(err){
            return res.status(401).json({
                massage: "Failed"
            });
        }
    },
}