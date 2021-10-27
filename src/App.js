import './App.css';
import './Css/Nav.css';
import "./Css/Dash.css";
import Navbar from './Component/Navbar/Navbar';
import Dashbord from "./Component/Pages/Dashbord"
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Navbar/>
      <Dashbord/>
    </Fragment>
  );
}

export default App;
