//loop clousre
//Each iteration creates a new scope → closure stores correct value of i

for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

//output
//1
//2
//3
