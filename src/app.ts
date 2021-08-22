import express from 'express'
import path from 'path'
import { renderFile } from 'ejs'

import routes from './routes'
import passport from './middlewares/passport'

const app = express()

const publicDir = path.resolve(__dirname, '..', 'public')

app.engine('html', renderFile)
app.set('view engine', 'ejs')
app.set('views', publicDir + '/views')

app.use(express.static(publicDir))
app.use(express.json())
app.use(passport().initialize());
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app
