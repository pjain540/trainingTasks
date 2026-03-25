// Function that creates a counter
function createCounter() {
  // This variable is private (not accessible outside)
  let count = 0;

  // Returning an object with multiple methods
  return {
    // Increment function
    increment: function () {
      count++; // Increase count by 1
      return count; // Return updated value
    },

    // Decrement function
    decrement: function () {
      count--; // Decrease count by 1
      return count; // Return updated value
    },

    // Reset function
    reset: function () {
      count = 0; // Reset count to 0
      return count; // Return reset value
    },

    // Getter (optional, useful)
    getValue: function () {
      return count; // Return current value without modifying
    }
  };
}

// Create a new counter instance
const counter = createCounter();

// Using the counter
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset());     // 0
console.log(counter.getValue());  // 0