import React from 'react';
import { StyleButton } from './Styles/style-components';

type renderAgainType = ()=>void;

interface ChildProps {
   name : boolean;
   renderAgain? : renderAgainType;
}

const Child:React.FC<ChildProps> = (props) => {
  
  return (
    <div>
      <h1>{props.name}</h1>
      <StyleButton onClick={props.renderAgain}>Click me</StyleButton>
    </div>
  )
}

export default React.memo(Child);
