//Dynamic functions
// inner function remembers value of x

function multiply(x){
    return function(y){
        return x*y
    }
}

const double = multiply(2)
console.log(double(5))

//output
//10