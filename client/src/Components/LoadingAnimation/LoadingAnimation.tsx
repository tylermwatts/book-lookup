import * as React from 'react';
import loadingAnimation from '../../img/loadingAnimation.svg';
import './LoadingAnimation.css';

export interface LoadingAnimationProps {}

export const LoadingAnimation: React.SFC<LoadingAnimationProps> = () => {
  return (
    <div className="loading-container">
      <div className="loading-background">
        <div className="loading-text">
          <i>Loading...</i>
        </div>
        <img src={loadingAnimation} alt="loading animation" />
      </div>
    </div>
  );
};
