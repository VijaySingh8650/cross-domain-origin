import React, {useState, useCallback } from 'react';
import {StyleButton} from "./Styles/style-components";
import Child from './child';

const App: React.FC = () => {

  const [count, setCount] = useState<number>(0);
  const [rend, setRend] = useState<boolean>(false);
  const [name, setName] = useState<boolean>(true);

  const updatedCount =  React.useMemo(expensiveFunction,[count]);

  function expensiveFunction():number{
    console.log("hjsdjhds");
    return count*2;
  }

  

  const increment = ():void =>{
     setCount(count+1);
  }

  const decrement = ():void =>{
     setCount(count-1);
  }

  const renderAgain = useCallback(function():void{
    setName(!name);
  }, [name]);


  return (
    <div>

        <StyleButton onClick={decrement}>Decrement</StyleButton>
        <p>{count}</p>
        <p>{updatedCount}</p>
        <StyleButton onClick={increment}>Increment</StyleButton>
        <StyleButton onClick={():void=>{
            setRend(!rend);
        }}>Render</StyleButton>

        <Child name={name} renderAgain={renderAgain}/>
      
    </div>
  )
}

export default App;
