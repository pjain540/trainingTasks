//wait for all promises
//example

Promise.myAllSettled([
  Promise.resolve(1),
  Promise.reject("Error"),
])
.then(console.log);

//output
[
  { status: "fulfilled", value: 1 },
  { status: "rejected", reason: "Error" }
]