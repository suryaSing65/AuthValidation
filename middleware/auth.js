// Login  Authentication....
const isLogin = async (req, res, next) => {
    try {
        
        if (!req.session.userId ){
            res.status(401).json({status :401, msg:'Anauthorized User'});
        }else{
            next();
        }
   
    } catch (error) {
        res.status(500).json({status:500,msg:'Server Error'});
    }
}
module.exports = {
    isLogin
};