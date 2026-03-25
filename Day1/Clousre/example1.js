// counter example of clousre
//inner function remembers count even after counter is executed because of its lexical scope
function outer(){
    let count = 0;
    return function inner(){
        count++;
        console.log(count)
    }
}

const counter = outer()
counter()
counter()

//output
//1
//2