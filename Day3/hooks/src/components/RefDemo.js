import { useEffect, useRef, useState } from "react"

function RefDemo() {
    const inputRef = useRef()
    const prevValue = useRef()
    const [value, setValue] = useState("")
    useEffect(() => {
        prevValue.current = value
    }, [value])
    return (
        <div>
            <h2>Use Ref Hook</h2>
            <p>It stores mutable value, it persist across render but it does not cause re render</p>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn-primary" onClick={() => inputRef.current.focus()}>Focus Input</button>
            <p>Current: {value}</p>
            <p>Previous: {prevValue.current}</p>
        </div>
    )
}
export default RefDemo