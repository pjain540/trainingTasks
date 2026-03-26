import Content from "./Content";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

export default App;