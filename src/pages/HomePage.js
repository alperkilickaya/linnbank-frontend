import React from "react";
import Banner from "../components/home/Banner";
import Highlight from "../components/home/Highlight";
import AboutUs from "../components/shared/AboutUs";
import Services from "../components/shared/Services";
import PricingPlan from "../components/shared/PricingPlan";
import WhyChooseUs from "../components/home/WhyChooseUs.js";
import RecentlyBestTransactions from "../components/home/RecentlyBestTransactions";
import HowItWorks from "../components/shared/HowItWorks";
import CreditCounters from "../components/home/CreditCounters";
import Investors from "../components/home/Investors";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Highlight />
      <AboutUs />
      <Services />
      <PricingPlan />
      <WhyChooseUs />
      <RecentlyBestTransactions />
      <HowItWorks />
      <CreditCounters />
      <Investors />
    </div>
  );
};

export default HomePage;
