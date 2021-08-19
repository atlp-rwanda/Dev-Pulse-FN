import jwt from 'jsonwebtoken';



export const getUserInfo = () => {
  const pulseToken = localStorage.getItem('pulseToken');
  return jwt.verify(pulseToken, process.env.JWT_KEY);
}
