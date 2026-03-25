//Challenge 5: Handle 1000 Request

const http = require('http')

function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

const server = http.createServer(async(req,res) => {
    await delay(1000)
    res.end("Response after 1 sec")
})

server.listen(3000, ()=>console.log("Server Started"))