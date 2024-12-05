import { useEffect, useState } from 'react';
import MapPage from './MapPage';
import './App.css';

function App() {
  // const [number, setNumber] = useState(0);
  // useEffect(()=>{    
  //   console.log(`eEffect`);
  //   const interval = setInterval(()=>{
      
  //     setNumber(prev=> prev+1);
  //   },1001);
  //   return () =>{
  //     console.log(`clean interval`);
  //     clearInterval(interval);
  //   }
  // },[]);
  return (
    <div className="App">
      {/* <h1> {number} Hello world!</h1>; */}
      <MapPage />
    </div>
  );
}

export default App;
