import passport, { AuthenticateOptions } from 'passport'

import strategy from './strategy'

passport.use(strategy())

export default () => ({
  authenticate: (options: AuthenticateOptions) => passport.authenticate('jwt', options),
  initialize: () => passport.initialize()
})