//Private variables (Data Hiding)
//name is not accessible directly, but inner function can access it.

function user(){
    let name = "Purti"
    return function (){
        return name
    }
}

const getName = user()
console.log(getName())

//output
//Purti