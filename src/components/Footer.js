import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageList from '../containers/MessageList';

const Footer = () => {
  return (
  <>
    <div id="footer" className="row clearfix">
      <div className="col-12 col-md-4">
        <strong className="text-center text-md-left">Warbler</strong>
        <ul id="warblerFooterList">
          <li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
          <li><Link to="/profile"><i className="fas fa-user"></i>My Profile</Link></li>
          <li><Link to="/about"><i className="far fa-question-circle"></i>About</Link></li>
          <li><Link to="/contact"><i className="fas fa-address-card"></i>Contact</Link></li>
        </ul>
      </div>
      <div className="col-12 col-md-4">
        <strong className="text-center text-md-left mt-4 mt-md-0">Top Warbles</strong>
          <MessageList mode="all" search="" displayMode="footer" styles={{outerDiv: "", outerUlClass: "", outerUlId: "topWarblesList", outerLi: "topWarble", profileImg: "", messageContainer: "topWarbleBody"}} />
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
