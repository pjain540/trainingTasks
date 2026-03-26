import CallbackDemo from "./components/CallbackDemo";
import Counter from "./components/Counter";
import ExpensiveCalc from "./components/ExpensiveCalc";
import RefDemo from "./components/RefDemo";
import Users from "./components/Users";
import { useTheme } from "./context/ThemeContext";


function Content() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div style={{ padding: '20px' }}>
            <h2>This is main component</h2>
            <p>Theme is changing using Use Context Hook</p>
            <h3>Theme: {theme}</h3>
            <button onClick={toggleTheme} className="btn-primary">Toggle Theme</button>
            <hr/>
            <Counter/>
            <hr/>
            <Users/>
            <hr/>
            <ExpensiveCalc/>
            <hr/>
            <RefDemo/>
            <hr/>
            <CallbackDemo/>
        </div>
    );
}

export default Content;