//Promise: it represents the value that will be available in future.
//Promise chaining: When you use .then() multiple times and passing result from one step to another.

//Example

function step1() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000)
    })
}

function step2(num) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 1000)
    })
}

step1()
    .then((result) => {
        console.log("Step1 :", result)
        return step2(result)
    }).then((result) => {
        console.log("Step2 :", result)
    }).catch(err => {
        console.log(err)
    })

//output
//10
//20