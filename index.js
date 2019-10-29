const servert = require('./server')
server.use(express.json())

const db = require('./data/db')




server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})