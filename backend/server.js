const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const { errorHandler } = require('./middleware/error-middleware')
const connectDB = require('./database/db')

dotenv.config()

connectDB()

const wallets = require('./routes/wallet-routes')
const users = require('./routes/user-routes')
const plans = require('./routes/plan-routes')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(mongoSanitize())

app.use(helmet({ contentSecurityPolicy: false }))

app.use(xss())

app.use(hpp())

app.use(cors())

app.use('/api/wallets', wallets)
app.use('/api/plans', plans)
app.use('/api/users', users)

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
