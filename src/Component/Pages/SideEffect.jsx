import React, { useState, useEffect } from "react";
import { Form, Button, Card,Modal } from "react-bootstrap";

const SideEffect = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);

 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Ui=()=>{
    return <h1>helloxxxxxl</h1>
      }
  useEffect(() => {
    setCalculation(() => count * 2);
    console.log("nknk")
  }, [count]);

    // useEffect(() => {
    //   let timer = setTimeout(() => {
    //   setCount((count) => count + 1);
    // }, 1000);
    // return () => clearTimeout(timer)
    // }, []);
  return (
    <>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>{count}</h1>
      <p>Count: {count}</p>
      <button className="btn bg-primary" onClick={() => setCount( count + 1)}>+</button>
      <p>Calculation: {calculation}</p>

     
    </>
  );
};

export default SideEffect;
