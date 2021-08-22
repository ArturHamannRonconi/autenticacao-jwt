import { Router } from 'express'
import { sign } from 'jsonwebtoken'

import users from './database/users'
import passport from './middlewares/passport'

const routes = Router()


routes.route('/login')
  .get((req, res) => res.json({ message: 'Redirecionado' }))
  .post((req, res) => {
    const { email, password } = req.body
  
    const user = users.find(
      user => user.email === email &&
      user.password === password
    )
  
    if(!user) throw new Error('User not found!')
  
    const token = sign(
      { user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  
    return res.json({ token })
  })

routes.route('/users')
  .get(
    passport().authenticate({ failureRedirect: '/login',session: false }),
    (req, res) => res.json({ user_id: 1 })
  )

export default routes