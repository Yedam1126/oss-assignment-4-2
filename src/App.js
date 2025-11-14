import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Project 4-2</h1>       {/* 1. 텍스트 변경 */}
        <p className="description">
          This is my first React app with some CSS changes!
        </p>                                      {/* 2. 새로운 문단 추가 */}
        <button className="my-button">Click Me</button>  {/* 3. 버튼 추가 */}
      </header>
    </div>
  );
}

export default App;
