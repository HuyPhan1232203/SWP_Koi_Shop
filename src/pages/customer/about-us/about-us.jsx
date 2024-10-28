import React, { useEffect } from "react";
import "./about-us.css";
import AOS from "aos";
import "aos/dist/aos.css";
function AboutUs() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="about-us-section " data-aos="fade-up">
      <div className="image-section" data-aos="fade-up-right">
        <img
          className="about-img"
          src="/assets/images/about-us-img.jpg"
          alt=""
        />
      </div>
      <div className="about-content"></div>
      <div className="about-us-text">
        <h1 className="header-about-us" data-aos="fade-up-left">
          About Us
        </h1>
        <p
          className="des-about-us"
          data-aos="fade-up-left"
          data-aos-delay="100"
        >
          Welcome to Koi Shop, your premier destination for beautiful koi fish
          and aquatic supplies. We are passionate about providing koi
          enthusiasts with high-quality fish, expert advice, and exceptional
          customer service.
        </p>
        <p
          className="des-2-about-us"
          data-aos="fade-up-left"
          data-aos-delay="200"
        >
          We are committed to providing our customers with the highest quality
          Koi fish and unparalleled service. Our goal is to create a friendly
          platform that supports Koi enthusiasts in finding, purchasing, and
          caring for their aquatic companions.
        </p>
      </div>
      {/* <div className="about-icon">
        <FacebookOutlined />
        <YoutubeOutlined />
        <InstagramOutlined />
      </div> */}
    </div>
  );
}

export default AboutUs;
