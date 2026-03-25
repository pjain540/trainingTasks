//Event loop: Javascript is an single threaded. Event loop is an mechanism which allow javascript to handle asynchrounous request without blocking. It continuously checks the call stack and callback queues and move the task into the call stack for execution when it is empty.

//example
console.log("Start")

setTimeout(()=>console.log("Set Timeout"),1000)

Promise.resolve().then(()=>{
    console.log("Promise")
})

console.log("End")

//output
//Start
//End
//Promise
//Set Timeout

//explanation: First all the synchrounous request will get executed , then microtask like promises, process.nextTick() and at last macrotask will get executed like setTimeout(), setInterval() etc.