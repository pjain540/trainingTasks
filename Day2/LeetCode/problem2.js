//https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/
//Execute asynchronous function in parallel

var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        let results = [];
        let count = 0;

        functions.forEach((fn, index) => {
            fn()
                .then(res => {
                    results[index] = res;
                    count++;

                    if (count === functions.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
};