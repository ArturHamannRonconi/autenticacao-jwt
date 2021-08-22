import { Router } from 'express'
import { sign } from 'jsonwebtoken'

import users from './database/users'
import passport from './middlewares/passport'

const routes = Router()


routes.post('/login', (req, res) => {
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

/**
 *  A partir dessa linha o seguinte erro acontece!!
 * 
 * TypeError: Cannot read property 'authenticate' of undefined
 *   at Object.Authenticator.authenticate (/home/artur/Projects/Nodejs/autenticate/node_modules/passport/lib/authenticator.js:165:26)
 *   at Object.<anonymous> (/home/artur/Projects/Nodejs/autenticate/src/routes.ts:32:14)
 *   at Module._compile (internal/modules/cjs/loader.js:1068:30)
 *   at Module._compile (/home/artur/Projects/Nodejs/autenticate/node_modules/source-map-support/source-map-support.js:547:25)
 *   at Module.m._compile (/tmp/ts-node-dev-hook-1510604481394644.js:69:33)
 *   at Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
 *   at require.extensions.<computed> (/tmp/ts-node-dev-hook-1510604481394644.js:71:20)
 *   at Object.nodeDevHook [as .ts] (/home/artur/Projects/Nodejs/autenticate/node_modules/ts-node-dev/lib/hook.js:63:13)
 *   at Module.load (internal/modules/cjs/loader.js:933:32)
 *   at Function.Module._load (internal/modules/cjs/loader.js:774:14)
 *  [ERROR] 18:23:38 TypeError: Cannot read property 'authenticate' of undefined
 */


routes.get('/user',
  passport().authenticate('jwt', { session: false }),
  (req, res) => res.json({ user_id: 1 })
)

export default routes