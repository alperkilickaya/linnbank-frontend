import React from "react";
import PageHeader from "../components/shared/PageHeader";
import AboutUs from "../components/shared/AboutUs";
import Services from "../components/shared/Services";
import PricingPlan from "../components/shared/PricingPlan";
import HowItWorks from "../components/shared/HowItWorks";

const AboutUsPage = () => {
  return (
    <>
      <PageHeader title="ABOUT US" page="ABOUT US" />
      <AboutUs />
      <Services />
      <PricingPlan />
      <HowItWorks />
    </>
  );
};

export default AboutUsPage;
