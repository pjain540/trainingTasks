import { useState } from "react"

function TaskInput({ addTask }) {
    const [text, setText] = useState("")
    return (
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => addTask(text)}>Add</button>
        </div>
    )
}
export default TaskInput