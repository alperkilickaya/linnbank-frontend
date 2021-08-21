import React from "react";

const Contact = () => {
  return (
    <>
      {/* <!-- contact page conten area start --> */}
      <div className="contact-page-content-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="content">
                  <h4 className="title">Address:</h4>
                  <span className="details">
                    {" "}
                    St. Zip. Encinitas. 260-C North El Camino, USA
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="content">
                  <h4 className="title">Phone & Fax</h4>
                  <span className="details">(888) 123-4567</span>
                  <span className="details">(123) 123-4567</span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="content">
                  <h4 className="title">Email Address</h4>
                  <span className="details">support@example.com</span>
                  <span className="details">info@example.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-map">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    {/* <iframe
                      id="gmap_canvas"
                      src="../../maps/embed.htm?q=Sheikh%20Tower%2C%20%20Bogra%205800&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    ></iframe> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- contact page conten area end --> */}
    </>
  );
};

export default Contact;
