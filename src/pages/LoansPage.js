import React from "react";
import PageHeader from "../components/shared/PageHeader";
import LoanPlan from "../components/loan/LoanPlan";
import LoanHowItWorks from "../components/loan/LoanHowItWorks";
import ApplyLoan from "../components/loan/ApplyLoan";
import HowItWorks from "../components/shared/HowItWorks";

const LoansPage = () => {
  return (
    <div>
      <PageHeader title="LOAN" page="LOAN" />
      <LoanPlan />
      <LoanHowItWorks />
      <ApplyLoan />
      <HowItWorks />
    </div>
  );
};

export default LoansPage;
