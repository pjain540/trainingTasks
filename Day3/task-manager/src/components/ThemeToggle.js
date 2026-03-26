import { useTheme } from "../context/ThemeContext"

function ThemeToggle(){
    const {ThemeToggle}=useTheme()
return(
    <button onClick={ThemeToggle}>Toggle theme</button>
)
}
export default ThemeToggle