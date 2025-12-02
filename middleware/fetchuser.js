import jwt from 'jsonwebtoken';
const JWT_SECRET = "your_jwt_secret_key_here";
const fetchuser= (req, res, next) => {
    //get user from jwt token and add id to req object
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid', details: error.message });
  }
};

export default fetchuser;
