import { useState } from "react"
import { useTheme } from '../context/ThemeContext'

function Counter() {
    const [count, setCount] = useState(0)
    const { theme, toggleTheme } = useTheme()
    return (
        <div>
            <h2>Use State Hook</h2>
            <p>Here called an use context as use context pass the state globally</p>
            <h4>Theme at Counter: {theme}</h4>
            <h4>Counter: {count}</h4>
            <div style={{ display: 'flex',gap:10 }}>
                <button onClick={toggleTheme} className="btn-primary">Toggle button in counter button</button>
                <button className="btn-primary" onClick={()=>setCount((prev)=>prev+1)}>Count</button>
            </div>
        </div>
    )
}
export default Counter