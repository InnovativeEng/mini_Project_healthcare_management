import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h2>Biography</h2>
          <h3>Who We Are</h3>
          <p>
            Acharya Healthcare is a digital platform designed to simplify and enhance everyday medical processes. Our project aims to bring better coordination between patients, doctors, and healthcare staff through a clean and efficient online system.
            We focus on providing a space where patient information can be managed securely, appointments can be handled smoothly, and essential medical updates can be accessed easily. The goal is to reduce manual workload, improve accuracy, and make healthcare services more organized and reliable.
          </p>
          <p>Acharya Healthcare supports users by offering a structured system for maintaining patient details, tracking reports, and managing essential records. It is created with the intention of improving medical workflow and helping healthcare environments operate with clarity and speed.

        </p>
          <p>Our purpose is simple:
            to make healthcare management smarter, more accessible, and more user-friendly.

        </p>
          <p>
           At Acharya Healthcare, we are committed to building a system that makes medical processes feel easier, faster, and more human.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
