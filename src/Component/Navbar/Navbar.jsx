import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { ProductData } from "../../Assets/data";
const data = ["sofas", "sajkd", "hskag", "jkualas"];
const Navbar = () => {
  let [searchfilter, setSearchfilter] = useState("");
  let [show, setShow] = useState(false);
  let [cardToshow, setCardToshow] = useState(false);
  let [datatodisplya, setDatatodisplya] = useState(ProductData[0].results);

  const filterhandler = (e) => {
    setSearchfilter(e.target.value);
  };
  const mouseHandler = () => {
    setCardToshow(!false);
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
      <nav className="navbar navbar-expand-lg navbar-dark navbar sticky ">
        <img
          className="navlogo"
          src="https://d2alvkbeky9xdq.cloudfront.net/img/New-wiculty-logo.png"
          alt="logo"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <div className="search my-5 my-lg-0">
           
            <div className="d-flex justify-content-center ">
              <input
                className="form-control mr-sm-2 "
                type="search"
                placeholder="Enter course or keyword"
                aria-label="Search"
                onChange={filterhandler}
              />
              <AiOutlineSearch className="searchIcon" />
            </div>

            {/* {searchfilter ? (
              <div className="card" style={{ zIndex: "2", width: "600px" }}>
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
                    <ul>
                      <li value={value} className="dropdown-item">
                        {value}
                      </li>
                    </ul>
                  );
                })}
              </div>
            ) : (
              ""
            )} */}
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
                <Link className="nav-link" to="/side">
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

      {searchfilter ? (
        <div className="suggestionbox ">
          <div
            className="col-md-3 col-lg-3 col-sm-3"
            style={{
              borderRight: "1px solid rgb(214, 214, 214)",
              padding: "0px",
            }}
          >
            <div className="search-box-product-titles">TOP SEARCHES</div>

            <div className="suggestion-list" onMouseMove={mouseHandler}>
              sofas
            </div>

            <div className="suggestion-list" >Table</div> 
            <div className="search-box-product-titles">TOP COLLECTION</div>
            <div
              className="suggestion-list fromLeft text-ellipses"
              style={{ texttransform: "capitalize" }}
            >
              <img
                src="https://www.royaloakindia.com/royaloak-react/public/react-images/pdpFlagsDesk/malaysiandesk.png"
                width="20"
                height="14"
              />
              <span style={{ paddingleft: "8px" }}>Malaysian Collection</span>
            </div>
          </div>

          <div
            className="col-md-9 col-lg-9 col-sm-9"
            style={{
              display: "table-column-group",
              padding: "0px 0px 0px 11px",
            }}
          >
            <div className="search-box-product-main-title">
              Popular Products in ‘ American Collection ’
            </div>
            <div className="d-flex flex-wrap " style={{ maxHeight: "100%" }}>
              {cardToshow
                ? datatodisplya.map((value,index) => {
                    return (
                      <div key={index} className="col-xl-4 col-lg-4 col-md-4 cardhover pr1">
                        <a
                          href="https://www.royaloakindia.com/product/royaloak-melbourne-three-seater-sofa-grey-1610"
                          target="_blank"
                          title="Royaloak Melbourne Wooden Sofa 1S in Brown Color Cushion"
                          className=""
                          itemprop="url"
                          style={{ textdecoration: "none", width: "100%" }}
                        >
                          <img
                            className="img-responsive b-lazy  b-loaded"
                            alt="sofa"
                            src={value.productimage}
                            itemprop="image"
                            style={{ width: "100%", height: "110px" }}
                          />
                        </a>
                        <div className="">
                          <h6
                            className="search-box-product-name"
                            style={{ margintop: "2px" }}
                          >
                            {value.productname}
                          </h6>
                          <div className="price-old">
                            <span className="product-price-suggestion-box">
                              Rs {value.sellingprice}
                              <span className="oldPriceBeforeDiscount price-strike ml-2">
                                Rs. {value.mrpprice}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Navbar;
