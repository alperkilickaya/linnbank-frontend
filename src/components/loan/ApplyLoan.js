import React from "react";

const ApplyLoan = () => {
  return (
    <div>
      {/* <!-- apply_loan_start  --> */}
      <div className="apply_loan">
        <div className="overlay"></div>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div
                className="loan_text wow fadeInLeft text-lg-left text-center"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <h3>Apply for a Loan for your startup, education or company</h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="loan_btn text-lg-right text-center wow fadeInUp"
                data-wow-duration="1.2s"
                data-wow-delay=".4s"
              >
                <a className="btn btn-blue" href="apply.html">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- apply_loan_end  --> */}
    </div>
  );
};

export default ApplyLoan;
