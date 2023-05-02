const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token, 'boss', function(err, decoded) {
        if(decoded){
            req.body.author=decoded.author
            req.body.authorID=decoded.authorID
          console.log(decoded)
         
            next()
        }else{
            res.send({"err":err})
        }
      });
}
module.exports=auth