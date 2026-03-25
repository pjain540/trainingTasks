//Challenge 1: Read a File (Async vs Sync)
//Task:
// Read a file using:
// fs.readFile (async)
// fs.readFileSync (sync)
// Compare behavior

const fs = require('fs')

//async(non-blocking)
fs.readFile('test.txt','utf8',(err,data)=>{
    if (err) throw err;
    console.log("Async:",data)
})

console.log("This runs first (non-blocking)");

//output
//This runs first (non-blocking)
//Async: Hello