import React from "react";
import PageHeader from "../components/shared/PageHeader";
import ContactArea from "../components/contact/ContactArea";
// import ContactMap from "../components/contact/ContactMap";
import Contact from "../components/contact/Contact";

const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact Us" page="Contact Us" />
      <ContactArea />
      {/* <ContactMap /> */}
      <Contact />
    </>
  );
};

export default ContactPage;
