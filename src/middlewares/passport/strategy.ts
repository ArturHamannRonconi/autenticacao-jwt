import { ExtractJwt, Strategy } from 'passport-jwt'

import users from '../../database/users'

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
const secretOrKey = process.env.JWT_SECRET

export default () => new Strategy({ jwtFromRequest, secretOrKey }, (payload, done) => {
  const user = users.find(user => user.id === payload.user_id)

  if(!user) return done(new Error('Unautorized: 401'))

  return done(null, { user_id: user.id }) 
})