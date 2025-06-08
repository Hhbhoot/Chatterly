import jwt from 'jsonwebtoken';
const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn ?? '1d',
  });
};

export default generateToken;
