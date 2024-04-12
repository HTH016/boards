
import './App.css';
import axios from 'axios';

function App() {
  
  const selectAll = async() => {
    alert("selectAll!")
    const result = await axios.get('/movies')
    console.log(result)
  }

  return (
    
    <div className="App">
        <h1> React-Express-MySQL 연결 </h1>
        <button onClick={selectAll}> 모두 조회 </button>
    </div>
    
  );
}

export default App;
