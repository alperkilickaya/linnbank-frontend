import React from "react";

const AboutUs = () => {
  return (
    <>
      {/* <!--about-us-area start--> */}
      <div className="about-us-area pd-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8 align-self-center">
              <div className="about-us-video">
                <img className="thumb" src="assets/img/about/1.png" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="about-us-details">
                <div className="section-title">
                  <h6 className="subtitle">About The E-Banking</h6>
                  <h2 className="title">
                    Nothing is impossible. We can help you achieve your goals!
                  </h2>
                  <p>
                    Online banking can save you a lot of time and effort, you
                    can undertake most transactions from the comforts of your
                    home. However, it is crucial to use internet banking safely.
                  </p>
                </div>
                <div className="media media-1">
                  <div className="media-left">
                    <img src="assets/img/about/01.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <p>
                      Nro eos et accusam et justo duo dolores et ea rebum. Stet
                      clita kasd gubergren, no sea takimata sanctus dolor sit.
                    </p>
                  </div>
                </div>
                <div className="media media-2">
                  <div className="media-left">
                    <img src="assets/img/about/02.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <p>
                      Easy pament process belief Lorem Ipsum is not simply
                      random text. It has roots in a McClintock.
                    </p>
                  </div>
                </div>
                <a className="btn btn-blue" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--about-us-area end--> */}
    </>
  );
};

export default AboutUs;
