const jwt = require("jsonwebtoken");

const config = process.env;

const verifyTOken = (req, res, next)=>{
	const token = req.body.token || req.query.token || req.headers['authorization'];
	console.log(req.path)
	if(!token ){
		return res.status(403).send("A token is required for get data");		
	}
	try {

		const decodeToken = jwt.verify(token, config.JWT_KEY);
		if(!decodeToken.verfiyAt && req.path != "/validate-user"){
			return res.status(401).send("Please Verify user,");
		}
	} catch(err){
		return res.status(401).send("Invalid token");
	}
	return next();
}

module.exports = verifyTOken;