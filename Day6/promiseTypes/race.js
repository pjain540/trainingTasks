//return result of first settled promise
//example

const p1 = new Promise(res => setTimeout(() => res("A"), 1000));
const p2 = new Promise(res => setTimeout(() => res("B"), 500));

Promise.myRace([p1, p2])
  .then(console.log); // "B"