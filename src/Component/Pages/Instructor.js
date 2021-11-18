import React from "react";

const Instructor = () => {
  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        class="carousel slide"
        data-ride="carousel"
        style={{ marginTop: "80px" }}
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="https://d2alvkbeky9xdq.cloudfront.net/img/instructor-banner.png"
              alt="First slide"
            />
            <div className="centered">
              <span className="headertext">TRAINING</span>
              {/* <div>
                <span className="headertext">JUST AJOB</span>
              </div>
              <div>
                <span className="headertext">BUT MORE THAN THAT</span>
              </div>
              IS NOT Wiculty caters to build a world-class instructor network
              for better learning delivery */}
            </div>
            <div className="w-100 h-100px">
              <h5 className="text">
                Take a Diligent & Rapid Push into the Instructor’s Crew of
                Wiculty
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row col-auto justify-content-center">
          <div className="col-sm-4 card ">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i className="fas fa-bezier-curve fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">
              Become a path builder for your learner’s crew
            </h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="col-sm-4 card">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i class="fas fa-lightbulb fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">
              Profile spicing & build your own valuation
            </h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="col-sm-4 card">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i className="fas fa-chalkboard-teacher fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">
              Inculcate your mentoring practise widely
            </h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>
        <div className="row col-auto justify-content-center">
          <div className="col-sm-4 card">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i className="fas fa-building fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">
              Witness wide exposure to training market
            </h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="col-sm-4 card">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i className="fas fa-users fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">
              Get looped into the professional network
            </h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="col-sm-4 card">
            <span style={{ color: "Dodgerblue", paddingTop: "10px" }}>
              <i className="fas fa-hand-holding-usd fa-3x"></i>
            </span>
            <h6 className="mt-3 m-2">Grab splendid monetary benefits</h6>
            <p className="card-text m-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>

        <div className="w-100 h-100px">
          <h5 className="text">
            Happily sink into our training effectiveness before on boarding
          </h5>
        </div>
        <div className=" justify-content-center d-flex">
          <div className="w-100" style={{ flexDirection: "column" }}>
            <h6 className="mt-3 ml-2 mr-5">Your brain may trigger this</h6>
            <p className="card-text ml-2 mr-5">
              Tell me why should I join here?kjnvka
            </p>
            <h6 className="mt-3 ml-2 mr-5 mt-5 ">
              This may be your serious question
            </h6>
            <p className="card-text ml-2 mr-5 mb-5">
              What can be my take away from you as an instructor?
            </p>
            <h6 className="mt-3 ml-2 mr-5">If you think</h6>
            <p className="card-text ml-2 mr-5">
              I am a contemporary instructor & never followed outlanded
              approaches. Guess you are at right place to go ahead!
            </p>
          </div>
          <form className="w-100">
            <div className="login">
              <div className="input-group mb-3">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email ID*"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  name="mobile"
                  type="number"
                  className="form-control"
                  placeholder="Mobile number*"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div class="input-group mb-3">
                <input
                  name="profile"
                  type="text"
                  className="form-control"
                  placeholder="Your linkedin Profile"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlFile1">Upload Resume*</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <h5 className="text">
          Join the Vibrant Queue of Most Happening Training Canopy
        </h5>
          <p style={{ textAlign: "center" }}>Instructor-friendliness matters a lot to us</p>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-ride="carousel"
          style={{ marginTop: "80px" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://d2alvkbeky9xdq.cloudfront.net/img/cook-your-course.png"
                alt="First slide"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Instructor;
