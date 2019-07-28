import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import './About.css';

export interface AboutProps {}

const About: React.SFC<AboutProps> = () => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 500 }}
    >
      {props => (
        <div className="about" style={props}>
          <div className="about-container">
            <h1 className="h1">About</h1>
            <main>
              <p className="p">{`This is a project made by Tyler Watts to learn TypeScript and React Router. It uses the Google Books API to fetch titles and display data.`}</p>
            </main>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default About;
