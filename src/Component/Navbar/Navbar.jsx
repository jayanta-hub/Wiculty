import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Searchdata } from "../../Assets/data";
const Navbar = () => {
  let [searchfilter, setSearchfilter] = useState("");
  let [show, setShow] = useState(false);
  let [datatodisplya, setDatatodisplya] = useState("");

  const filterhandler = (e) => {
    setSearchfilter(e.target.value);
  };
  const filterhandler1 = () => {
    setShow(!show);
    console.log(show);
  };
  const filterhandler2 = () => {
    setShow(false);
  };
  // const valuehandler=(e)=>{
    
  //   setDatatodisplya()
  // }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar sticky col-md-12">
        <div className="collapse navbar-collapse col-md-12" id="navbarTogglerDemo01">
          <img
            className="navlogo"
            src="https://d2alvkbeky9xdq.cloudfront.net/img/New-wiculty-logo.png"
            alt="logo"
          />
          <div className="search my-5 my-lg-0">
            {/* <select class="custom-select" id="inputGroupSelect01">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select> */}
            <input
              className="form-control mr-sm-2 "
              type="search"
              placeholder="Enter course or keyword"
              aria-label="Search"
              onChange={filterhandler}
              onClick={filterhandler1}
              // onMouseLeave={filterhandler2}
            />
            {show ? (
              <div className="card" style={{zIndex:"2"}}>
                {Searchdata.filter((value) => {
                  if (searchfilter === "") {
                    return value;
                  } else if (
                    value
                      .toLowerCase()
                      .includes(searchfilter.toLocaleLowerCase())
                  ) {
                    return value;
                  }
                }).map((value) => {
                  return (
                    <li value={value}
                      className="dropdown-item"
                      // href="https://getbootstrap.com/docs/4.6/components/dropdowns/"
                    >
                      {value}
                    </li>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="ml-auto navitem">
            <ul className="navbar-nav  ">
              <li className="nav-item active">
                <Link className="nav-link" to="/dashbord">
                  Refer & Earn
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  Demos | Webinars
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/instructor">
                  Join as Instructor
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Corporate
                </Link>
              </li>

              <li className="nav-item  active">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
                {/* <div className="dropdown-divider"></div> */}
              </li>

              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  <button className="btn color my-2 my-sm-0" type="submit">
                    Sing up / Log in
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
