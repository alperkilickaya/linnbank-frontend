import React from "react";

const NewsLetter = () => {
  return (
    <>
      {/* <!-- sign-up area start --> */}
      <div class="container">
        <div class="sign-up-area">
          <div class="row">
            <div class="col-lg-6">
              <div class="media align-items-center">
                <div class="media-left">
                  <i class="fa fa-envelope-o"></i>
                </div>
                <div class="media-body">
                  <h5>SignUp For Newsletter</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <form class="d-md-inline-flex">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your mail here"
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- sign-up area start --> */}
    </>
  );
};

export default NewsLetter;
