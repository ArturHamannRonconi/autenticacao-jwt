import express from 'express'

import routes from './routes'
import passport from './middlewares/passport'

const app = express()

app.use(passport().initialize());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2Mjk2NjQwODEsImV4cCI6MTYyOTY2NzY4MX0.qNAZE5J8crWOFcx_MuHsey7UU8rpgr3xhvbiMy1BkZk