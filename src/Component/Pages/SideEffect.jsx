import React, { useState, useEffect } from "react";
import { Form, Button, Card,Modal } from "react-bootstrap";

const SideEffect = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(true);

 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   setCalculation(() => count * 2);
  // }, [count]);

  //   useEffect(() => {
  //     let timer = setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);

 

  //   return () => clearTimeout(timer)
  //   }, []);
  return (
    <>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>{count}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>

      {show1 ? (

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      ) : (
        ""
      )}

     

        {/* <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
     
    </>
  );
};

export default SideEffect;
