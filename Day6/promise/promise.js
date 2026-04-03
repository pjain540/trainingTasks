class MyPromise {
    
  constructor(executor) {
    // Initial state of promise
    this.state = "pending";   // can be: pending, fulfilled, rejected
    this.value = undefined;  // stores resolved value or rejection error
    this.handlers = [];      // queue to store then handlers

    // resolve function → moves promise to fulfilled state
    const resolve = (value) => {
      if (this.state !== "pending") return; // state can change only once

      this.state = "fulfilled";
      this.value = value;

      // execute all stored handlers
      this.handlers.forEach((h) => this.handle(h));
    };

    // reject function → moves promise to rejected state
    const reject = (error) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.value = error;

      // execute all stored handlers
      this.handlers.forEach((h) => this.handle(h));
    };

    // immediately execute the executor function
    try {
      executor(resolve, reject);
    } catch (err) {
      // if executor throws error → reject promise
      reject(err);
    }
  }

  // handle function → processes then handlers
  handle(handler) {
    // if promise is still pending → store handler for later
    if (this.state === "pending") {
      this.handlers.push(handler);
      return;
    }

    // if promise is fulfilled
    if (this.state === "fulfilled") {
      // if no onFulfilled provided → pass value forward
      if (!handler.onFulfilled) {
        handler.resolve(this.value);
      } else {
        try {
          // execute success callback
          const result = handler.onFulfilled(this.value);

          // resolve next promise with returned result
          handler.resolve(result);
        } catch (err) {
          // if error occurs → reject next promise
          handler.reject(err);
        }
      }
    }

    // if promise is rejected
    if (this.state === "rejected") {
      // if no onRejected provided → propagate error
      if (!handler.onRejected) {
        handler.reject(this.value);
      } else {
        try {
          // execute failure callback
          const result = handler.onRejected(this.value);

          // resolve next promise (important for chaining)
          handler.resolve(result);
        } catch (err) {
          handler.reject(err);
        }
      }
    }
  }

  // then method → used for chaining
  then(onFulfilled, onRejected) {
    // returns a new promise (this enables chaining)
    return new MyPromise((resolve, reject) => {
      this.handle({
        onFulfilled, // success callback
        onRejected,  // failure callback
        resolve,     // resolve of new promise
        reject,      // reject of new promise
      });
    });
  }
}