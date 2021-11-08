import React from "react";

const Login = () => {
  return (
    <>
      {/* <div className="container">
  <form action="/action_page.php">
    <div className="row">
      <h2 style={{textalign:"center"}}>Login with Social Media or Manually</h2>
      <div className="vl">
        <span className="vl-innertext">or</span>
      </div>

      <div className="col">
        <a href="#" className="fb btn">
          <i className="fa fa-facebook fa-fw"></i> Login with Facebook
         </a>
        <a href="#" className="twitter btn">
          <i className="fa fa-twitter fa-fw"></i> Login with Twitter
        </a>
        <a href="#" className="google btn"><i className="fa fa-google fa-fw">
          </i> Login with Google+
        </a>
      </div>

      <div className="col">
        <div className="hide-md-lg">
          <p>Or sign in manually:</p>
        </div>

        <input type="text" name="username" placeholder="Username" required/>
        <input type="password" name="password" placeholder="Password" required/>
        <input type="submit" value="Login"/>
      </div>
      
    </div>
  </form>
</div>

<div className="bottom-container">
  <div className="row">
    <div className="col">
      <a href="#" style={{color:"white"}} className="btn">Sign up</a>
    </div>
    <div className="col">
      <a href="#" style={{color:"white"}} className="btn">Forgot password?</a>
    </div>
  </div>
</div> */}
      <div className="loginpage">
        <div className="login">
          <form className="w-100">
            <div className="login">
              <div class="input-group mb-3">
                <input
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="Email ID*"
                  aria-describedby="basic-addon1"
                  required
                />
              </div>
              <div class="input-group mb-3">
                <input
                  name="mobile"
                  type="number"
                  class="form-control"
                  placeholder="Mobile number*"
                  aria-describedby="basic-addon1"
                  required
                />
              </div>

              <div class="input-group mb-3">
                <input
                  name="profile"
                  type="text"
                  class="form-control"
                  placeholder="Your linkedin Profile"
                  aria-describedby="basic-addon1"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
