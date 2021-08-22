import { Router } from 'express'
import passport from 'passport'

import strategy from './strategy'

const pass = Router()

passport.use(strategy())
pass.use(passport.initialize())

export default () => ({ authenticate: passport.authenticate, strategy: pass })