import React from "react";

const ContactArea = () => {
  return (
    <>
      {/* <!-- contact area start  --> */}
      <section className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-bottom-inner">
                {/* <!-- contact bottom inner --> */}
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="form-content-area">
                      {/* <!-- right content area --> */}
                      <h3 className="title text-center">Contact Us</h3>
                      <div className="contact-form-wrapper">
                        <form
                          action="contact.html"
                          method="POST"
                          id="contact_form"
                          className="contact-form"
                        >
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-element ">
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  placeholder="Name"
                                  className="input-field borderd"
                                />
                              </div>
                              <div className="form-element ">
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Email"
                                  className="input-field borderd"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-element ">
                                <input
                                  type="text"
                                  id="company"
                                  name="company"
                                  placeholder="Company"
                                  className="input-field borderd"
                                />
                              </div>
                              <div className="form-element ">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  placeholder="Phone Number"
                                  className="input-field borderd"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <textarea
                                rows="10"
                                cols="30"
                                id="message"
                                name="message"
                                placeholder="How can we help?"
                                className="input-field borderd textarea"
                              ></textarea>
                            </div>
                          </div>
                          <input
                            type="submit"
                            className="btn btn-blue"
                            value="Send a Message"
                          />
                        </form>
                      </div>
                    </div>
                    {/* <!-- //.right content area --> */}
                  </div>
                </div>
              </div>
              {/* <!-- contact bottom inner --> */}
            </div>
            {/* <!-- //.col-lg-12 --> */}
          </div>
        </div>
      </section>
      {/* <!-- contact area end --> */}
    </>
  );
};

export default ContactArea;
