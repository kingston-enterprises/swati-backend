import jwt , { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'

const protect = asyncHandler(async (req: any, res:any, next:any) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      //const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      
      // Get user from the token
      req.user = await userModel.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default protect 
