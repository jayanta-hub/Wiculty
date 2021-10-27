import React from "react";

const Navbar = () => {


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar sticky">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <img
            className="navlogo"
            src="https://d2alvkbeky9xdq.cloudfront.net/img/New-wiculty-logo.png"
            alt="logo"
          />

          <form className="form-inline my-5 my-lg-0">
            <input
              className="form-control mr-sm-2 "
              type="search"
              placeholder="Enter course or keyword"
              aria-label="Search"
              
            />

            {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          <div className="md-6">
       
              
          </div>
        </div>
        
      </nav>
    </>
  );
};
export default Navbar;
