import { useMemo, useState } from "react"

function ExpensiveCalc() {
    const [num, setNum] = useState(0)

    const expensive = (n) => {
        console.log("Calcualating...")
        for (let i = 0; i <= 1000; i++) {

        }
        return n * 2
    }

    const result = useMemo(() => expensive(num), [num])

    return (
        <div>
            <h2>Use Memo hook</h2>
            <p>This hook is used to memorize the expensive calculation</p>
            <h3>Result of calculation: {result}</h3>
            <button className="btn-primary" onClick={() => setNum((prev) => prev + 1)}>Increase</button>
        </div>
    )
}
export default ExpensiveCalc