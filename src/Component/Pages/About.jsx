import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  let initialMinute = 1,
    initialSeconds = 0,
    initialHour = 1;
  const [hour, setHour] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hour === 0) {
            clearInterval(myInterval);
          }else {
            setHour(hour-1)
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
        {minutes === 0 && seconds === 0 & hour===0 ? null : (
          <h1>
         
           {hour < 10 ? `0${hour}` : hour} : {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        )}
      </div>
    </>
  );
};

export default Timer;
