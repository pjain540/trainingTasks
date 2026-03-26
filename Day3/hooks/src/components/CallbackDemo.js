import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick} className="btn-primary">Child Button</button>;
});

function CallbackDemo() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <h2>Use Callback Hook</h2>
      <button onClick={() => setCount(count + 1)} className="btn-primary">Increment</button>
      <p>{count}</p>
      <Child onClick={handleClick} />
    </div>
  );
}

export default CallbackDemo;