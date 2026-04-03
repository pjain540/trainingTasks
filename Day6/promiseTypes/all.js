//Promise.all() takes an array of promise.
//returns single promise.
//resolves when all succeed
//rejects immediately when even one fails
//Executes promise in parallel

//example
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3])
  .then(console.log); // [1, 2, 3]
