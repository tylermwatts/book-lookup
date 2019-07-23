import * as React from 'react';
import './About.css';
export interface AboutProps {}

const About: React.SFC<AboutProps> = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="h1">About</h1>
        <main>
          <p className="p">{`This is a project made by Tyler Watts to learn TypeScript and React Router. It uses the Google Books API to fetch titles and display data.`}</p>
        </main>
      </div>
    </div>
  );
};

export default About;
