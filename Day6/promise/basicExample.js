const myPromise = new Promise((resolve, reject) => {
    // Simulating a condition (like API success/failure)
    let success = true;

    // Simulating an async operation using setTimeout
    setTimeout(() => {
        if (success) {
            // If operation is successful → resolve the promise
            resolve("Task completed successfully!!");
        } else {
            // If operation fails → reject the promise
            reject("Task failed");
        }
    }, 1000); // runs after 1 second
}); // Promise constructor is executed immediately

// Handling the resolved or rejected value
myPromise
    .then((res) => {
        // This runs if promise is resolved
        console.log(res);
    })
    .catch((err) => {
        // This runs if promise is rejected
        console.log(err);
    });