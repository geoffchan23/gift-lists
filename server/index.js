const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const cors        = require('cors')
const morgan      = require('morgan')
const path        = require('path')
const listsRouter = require('./api/lists')

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

// Allow requests from all origins
app.use(cors({ origin: '*' }))

app.use('/api/lists', listsRouter)

app.use(express.static(path.join(__dirname, './../client/build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/build', 'index.html'))
})

// Handle React routing, return all requests to React app
app.use((req, res) => {
  res.status(400)
  res.send('Route not found')
})

app.listen(9000, () => console.log('\x1b[36m%s\x1b[0m', 'Gift Lists Server Running~'))
