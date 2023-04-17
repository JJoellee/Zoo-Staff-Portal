import React from 'react';
import './Home.css';
import Footer from './Footer';
import { InView } from 'react-intersection-observer';

function Home() {
  return (
    <div className="home">
      <InView>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className={`description${inView ? ' slide-from-left' : ''}`}
            style={{transition: 'transform 0.5s'}}
          >
            <h1>Welcome to JayZoo</h1>
            <p>
            Welcome, staff members! We are thrilled to have you as a part of our team. This website is your go-to place for everything related to our organization. From animals and events to important updates and announcements, we've got you covered.  Let's make great things happen together!
            </p>
          </div>
        )}
      </InView>
      <InView>
        {({ inView, ref }) => (
          <div ref={ref} className={`mission${inView ? ' slide-from-left' : ''}` } style={{transition: 'transform 0.8s'}}>
              <h2>Our Mission</h2>
  <p>Here at our zoo, we are committed to:</p>
  <ul>
    <li>Providing the best possible care for all our animals, ensuring their health, happiness, and wellbeing.</li>
    <li>Offering our staff a supportive and respectful workplace, where they can grow, learn, and contribute to our shared goals.</li>
    <li>Encouraging education and conservation efforts that promote the protection and preservation of our natural world.</li>
    <li>Creating a fun and engaging experience for all our visitors, while fostering appreciation and respect for wildlife.</li>
  </ul>
  <p>Through these efforts, we hope to inspire our community to take action and make positive changes for the planet and all its inhabitants.</p>
          </div>
        )}
      </InView>
      <InView>
        {({ inView, ref }) => (
          <div ref={ref} className={`map${inView ? ' slide-from-left' : ''}`} style={{transition: 'transform 1.2s'}}>
            <h2>Visit Us</h2>
            <p>Find us here:</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8133.467189258088!2d35.46807763634844!3d33.902142512193116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1saub!5e0!3m2!1sen!2slb!4v1681454617349!5m2!1sen!2slb"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        )}
      </InView>
      <InView>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className={`zooMap${inView ? ' slide-from-left' : ''}`}
            style={{transition: 'transform 1.5s'}}
          >
            <h2>JayZoo's Map</h2>
            <img src="./Assets/map.jpg" alt="Zoo Map"></img>
            <a href="https://www.freepik.com/free-vector/illustration-zoo-park-map_2922222.htm#query=zoo%20map&position=14&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik
          </div>
        )}
      </InView>
      <Footer />
    </div>
  );
}

export default Home;
