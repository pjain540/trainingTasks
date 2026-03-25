//setTimeout example
//even after one second of delay function remenbers the name.

function greet(name) {
    setTimeout(() => {
        console.log("Hello!!"+" " + name)
    }, 1000)
}

greet("Purti")

//output
//Hello!! Purti