import React from "react";

const Services = () => {
  const ServicesData = [
    {
      icon: "assets/img/service/01.png",
      title: "Online Business",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "1",
    },
    {
      icon: "assets/img/service/02.png",
      title: "Business Plan",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "2",
    },
    {
      icon: "assets/img/service/03.png",
      title: "Mobile Bank",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "3",
    },
    {
      icon: "assets/img/service/04.png",
      title: "Online Deposit",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "4",
    },
    {
      icon: "assets/img/service/05.png",
      title: "Credit Card",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "5",
    },
    {
      icon: "assets/img/service/06.png",
      title: "Income Monitoring",
      description:
        "Lorem ipsum dolor sit ametcteturs adipiscing elieiusincididunt ut labore et dol oremagna.",
      id: "6",
    },
  ];
  return (
    <>
      {/* <!--service-area start--> */}
      <div className="service-area default-pd">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-title">
                <h6 className="subtitle subtitle-thumb">Best Services</h6>
                <h2 className="title">
                  Presenting Banking Plan & Services That are Right For You
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {ServicesData.map((item) => {
              const { icon, title, description, id } = item;
              return (
                <div className="col-lg-4 col-md-6" key={id}>
                  <div className="single-service">
                    <div className="thumb">
                      <img src={icon} alt="img" />
                    </div>
                    <div className="service-details">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
