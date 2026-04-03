//resolves when first promise succeed
//Ignores rejections until all fail
//example

Promise.myAny([
  Promise.reject("Error 1"),
  Promise.resolve("Success"),
  Promise.reject("Error 2"),
])
.then(console.log);//success