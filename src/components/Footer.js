import React from 'react';

const Footer = () => {
  return (
  <>
    <div id="footer" className="row">
      <div className="col-12 col-md-4">
        <strong className="text-center text-md-left">Warbler</strong>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">My Profile</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="col-12 col-md-4">
      {/* will make this it's own component to bring out the warbles with the most replies */}
        <strong className="text-center text-md-left mt-4 mt-md-0">Top Warbles</strong>
        <div className="topWarble">
          <div class="text-center topWarbleImg">
            <img src="http://localhost:8081/images/image-1576531150591.jpg" />
          </div>
          <div className="topWarbleBody">
            <a href="#">@someone</a>
            <p className="m-0">Bacon ipsum dolor amet corned beef chicken drumstick leberkas, salami bacon ground round landjaeger.</p>
          </div>
        </div>
        <hr />
        <div className="topWarble">
          <div class="text-center">
            <img src="http://localhost:8081/images/image-1576531150591.jpg" />
          </div>
          <div className="warbleBody">
            <a href="#">@someone</a>
            <p className="m-0">Bacon ipsum dolor amet corned beef chicken drumstick leberkas, salami bacon ground round landjaeger.</p>
          </div>
        </div>
        <hr />
        <div className="topWarble">
          <div class="text-center">
            <img src="http://localhost:8081/images/image-1576531150591.jpg" />
          </div>
          <div className="warbleBody">
            <a href="#">@someone</a>
            <p className="m-0">Bacon ipsum dolor amet corned beef chicken drumstick leberkas, salami bacon ground round landjaeger.</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <strong className="text-center text-md-left mt-4 mt-md-0">Contact Warbler</strong><br/>
        <div class="contactRow">
        <i class="fas fa-address-card contactIcon"></i>
        <address>
          Dummy Address<br/>
          Lorem Ipsum Sit Amet<br/>
          Dummy Pin<br/>
          Dummy place<br/>
        </address>
        </div>
        Telephone : <a href="tel:+7777777777">+7777777777</a><br/>
        Email : <a href="mailto:info@dummy.com">info@dummy.com</a>
      </div>
    </div>
    <div id="footerBase" className="row">
      <div className="col-12 text-center">
        &copy; Copyright Warbler 2020
      </div>
    </div>
  </>
  );
}

export default Footer;
