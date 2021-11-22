import React, { Fragment } from "react";
import { useState } from "react";
import { ImageData } from "../../Assets/ImageData";


const Dashbord = () => {
  let [count, setCount] = useState(1);
  let [timeref, setTimeref] = useState();
  const coundown = () => {
    setTimeref(
      setInterval(() => {
        setCount(count++);
      }, 1000)
    );
  };
  const stop = () => {
    clearInterval(timeref);
  };

  return (
    <Fragment>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide "
        data-ride="carousel"
        style={{ marginTop: "80px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHwxOTA3Mjd8fHx8fHx8MTYzNTI0ODIyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800"
              className="d-block w-100"
              alt="logo"
            />
          </div>
        </div>
      </div>
      

      <div className="row row-cols-1 row-cols-md-3 m-1">
        {ImageData.map((value) => {
          return (
            <div className="col mb-4">
              <div className="card h-100 card-style">
                <img src={value.url} className="card-img-top" alt="image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">{value.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHwxOTA3Mjd8fHx8fHx8MTYzNTI0ODIyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800"
              className="d-block w-100"
              alt="logo"
            />
          </div>
        </div>
        <button onClick={coundown}>Count</button>
        <button onClick={stop}>stop</button>
        <p>{count}</p>
      </div>
    </Fragment>
  );
};
export default Dashbord;
