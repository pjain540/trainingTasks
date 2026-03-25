//async await: this is an sugarcoated way to handle promises, it makes the code readable.

//example
function step1() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000)
    })
}

function step2(num) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 1000)
    })
}

async function run() {
    try {
        const result1 = await step1()
        console.log("Result1:", result1)

        const result2 = await step2(result1)
        console.log("Result2:", result2)
    } catch (err) {
        console.log("Error:", err)
    }
}

run()