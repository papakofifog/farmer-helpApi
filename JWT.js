const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    'water'
  );

  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.headers.cookie;
  //let token=accessToken.match(/^[access-token=]/)
  const result=accessToken.slice(6,);
  //console.log(result)

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    
    const validToken = verify(result, 'water');
    
    if (validToken) {
      req.authenticated = true;
      
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken }