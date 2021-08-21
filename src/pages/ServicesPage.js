import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Services from "../components/shared/Services";
import PricingPlan from "../components/shared/PricingPlan";
import Testimonials from "../components/about/Testimonials";
import HowItWorks from "../components/shared/HowItWorks";

const ServicesPage = () => {
  return (
    <div>
      <PageHeader title=" SERVICES" page="SERVICES" />
      <Services />
      <PricingPlan />
      <Testimonials />
      <HowItWorks />
    </div>
  );
};

export default ServicesPage;
