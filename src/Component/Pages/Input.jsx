import React, { useState } from "react";

const Input = () => {
  let [data, setData] = useState({
    name:"",
    number:""
  });
  let [show, setShow] = useState(false);

  const capturedata = (e) => {
    setData({...data,[e.target.name]:e.target.value});

  };
  

  const dataToShow = (event) => {
    event.preventDefault();
    setShow(!false);
  };
  return (
    <>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="name"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={capturedata}
          />
          
        </div>
        <input
            name="number"
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={capturedata}
          />
          
       

        <button type="submit" className="btn btn-primary" onClick={dataToShow}>
          Submit
        </button>
      </form>

      {show ? (
        <div className="card">
          <div className="card-body">Name:{data.name}</div>
          <div className="card-body">Number:{data.number}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Input;
