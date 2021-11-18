import React, { useState, useEffect } from "react";
import {Form,Button,Modal} from 'react-bootstrap';

const SideEffect = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);

  //   useEffect(() => {
  //     let timer = setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);

  //   return () => clearTimeout(timer)
  //   }, []);
  return (
    <div>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>{count}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    
    </div>
  );
};

export default SideEffect;
