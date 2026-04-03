// Helper assert
function assert(condition, message) {
  if (!condition) {
    console.error("❌", message);
  } else {
    console.log("✅", message);
  }
}

// Simulated async task
function asyncTask(value, delay, shouldFail = false) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("Error at " + value);
      } else {
        resolve(value);
      }
    }, delay);
  });
}

// TEST CASE
Promise.myRace([
  asyncTask(5, 100),        // slower success
  asyncTask(10, 50)         // faster success (should win race)
])
.then((val) => {
  // Step 1: Race condition check
  assert(val === 10, "Race returns fastest promise");

  // Step 2: Chaining
  return val * 2;
})
.then((val) => {
  assert(val === 20, "Chaining works correctly");

  // Step 3: Return a failing promise
  return asyncTask(val, 50, true);
})
.then(() => {
  // This should NOT run
  assert(false, "This should not execute");
})
.catch((err) => {
  // Step 4: Error handling
  assert(err === "Error at 20", "Error propagated correctly");

  // Step 5: Recovery
  return 100;
})
.then((val) => {
  // Step 6: Continue chain after recovery
  assert(val === 100, "Chain continues after catch");
});