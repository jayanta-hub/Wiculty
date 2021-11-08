import './App.css';
import './Css/Nav.css';
import "./Css/Dash.css";
import Navbar from './Component/Navbar/Navbar';
// import Dashbord from "./Component/Pages/Dashbord"
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./Redux/Store";
import Dashbord from "./Component/Pages/Dashbord"
import About from "./Component/Pages/About";
import Instructor from "./Component/Pages/Instructor";
import Login from "./Component/Pages/Login"

let App = () => {
  return (
    <>
    {/* <Provider store={store}> */}
      <Router>  
        <Navbar />
        <Switch>
          <Route exact path="/dashbord" component={Dashbord} />
          <Route exact path="/about" component={About} />
          <Route exact path="/instructor" component={Instructor} />
          <Route exact path="/login" component={Login} />
         
        </Switch>
      </Router>
      {/* </Provider> */}
    </>
  );
};
export default App;