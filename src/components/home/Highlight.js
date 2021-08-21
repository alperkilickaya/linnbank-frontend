import React from "react";

const Highlight = () => {
  const HighLightData = [
    {
      icon: "assets/img/icon/arrow-down.png",
      title: "Withdraw",
      description: "Lorem ipsum dolor sit amet, consectetur",
      id: "1",
    },
    {
      icon: "assets/img/icon/arrow-right.png",
      title: "Send Money",
      description: "Lorem ipsm dolor sit amet, consectetur",
      id: "2",
    },
    {
      icon: "assets/img/icon/card.png",
      title: "Cards",
      description: "Lorem ipsum dolor sit amet, consectetur",
      id: "3",
    },
    {
      icon: "assets/img/icon/exchange.png",
      title: "Exchange",
      description: "Lorem ipsum dolor sit amet, consectetur",
      id: "4",
    },
  ];

  return (
    <>
      {/* <!-- money-option start --> */}
      <div className="money-option-area">
        <div className="container">
          <div className="row justify-content-center">
            {HighLightData.map((item) => {
              const { icon, title, description, id } = item;
              return (
                <div key={id} className="col-lg-3 col-md-6">
                  <div className="single-work mt-0 text-center">
                    <div className="work-icon">
                      <img className="" src={icon} alt="icon" />
                    </div>
                    <h5>
                      <a href="#">{title}</a>
                    </h5>
                    <p>{description}</p>
                    <a className="angle-btn" href="#">
                      <img
                        src="assets/img/icon/angle-left-round.png"
                        alt="icon"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Highlight;
