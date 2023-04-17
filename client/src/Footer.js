import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div class="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h6>About Us</h6>
            <p>We are a passionate team of animal lovers who strive to provide a safe and enjoyable experience for all our guests, while promoting conservation and appreciation for wildlife.</p>
          </div>
          <div className="col-md-4">
            <h6>Contact Us</h6>
            <ul className="list-unstyled">
              <li>Jay Street</li>
              <li>Beirut, Lebanon</li>
              <li><a href="mailto:joelleelhomsi@gmail.com">joelleelhomsi@gmail.com</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Connect With Us</h6>
            <ul className="list-unstyled">
              <li><a href="#">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/joelleelhomsi/" target="_blank">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>&copy; 2023 JayZoo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
