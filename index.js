const express = require('express');

const server = express()

server.use(express.json())


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})