import React from 'react';

/**
 * Dumb component - static content for about warbler
 */
const About = () => {
  return (
    <>
    <div id="aboutPage" className="row">
      <div className="col-4 text-center">
        <i className="fas fa-kiwi-bird"></i>
      </div>
      <div className="col-8">
        <h1>ABOUT WARBLER</h1>
        <p>Warbler is a toy project for me to experiment with JavaScript, React & Redux. Starting from the end project of the <a href="https://www.udemy.com/course/the-advanced-web-developer-bootcamp/">Advanced Web Developer Bootcamp</a> the following features have been added.</p>
        <ul>
          <li>Upload Images</li>
          <li>Reply to Messages (Recursive Model)</li>
          <li>Twitter API Integration</li>
          <li>Hashtags</li>
          <li>Message Timeling Filtering ( by username, hashtag with sorting and limits )</li>
          <li>Restyling & Footer</li>
          <li>Periodical refresh message count without full reload</li>
          <li>Message Aggregation</li>
          <li>Geolocation</li>
          <li>Backend RESTFul API Extended</li>
          <li>MessageList and MessageItem re-usable components</li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default About;
