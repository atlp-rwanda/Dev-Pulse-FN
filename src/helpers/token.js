import jwt from 'jsonwebtoken';



export const getUserInfo = () => {
  const pulseToken = localStorage.getItem('pulseToken');
  console.log(pulseToken,"###############3333",process.env);
  return jwt.verify(pulseToken, process.env.JWT_KEY);
}
