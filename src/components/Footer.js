import React from 'react';

const Footer = () => {
  return (
  <>
    <div id="footer" className="row clearfix">
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
          <div className="text-center topWarbleImg">
            <img src="http://localhost:8081/images/image-1576531150591.jpg" />
          </div>
          <div className="topWarbleBody">
            <a href="#">@someone</a>
            <p className="m-0">Bacon ipsum dolor amet corned beef chicken drumstick leberkas, salami bacon ground round landjaeger.</p>
          </div>
        </div>
        <hr />
        <div className="topWarble">
          <div className="text-center">
            <img src="http://localhost:8081/images/image-1576531150591.jpg" />
          </div>
          <div className="warbleBody">
            <a href="#">@someone</a>
            <p className="m-0">Bacon ipsum dolor amet corned beef chicken drumstick leberkas, salami bacon ground round landjaeger.</p>
          </div>
        </div>
        <hr />
        <div className="topWarble">
          <div className="text-center">
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
        <div className="contactRow">
        <i className="fas fa-address-card contactIcon"></i>
        <address>
          101 Warbler Place<br/>
          Warbler Upon Warble<br/>
          Warbleshire<br/>
          WA2 3IE<br/>
        </address>
        </div>
        Telephone : <a href="tel:+7777777777">+7777777777</a><br/>
        Email : <a href="mailto:info@dummy.com">warble@warbler.com</a>
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
