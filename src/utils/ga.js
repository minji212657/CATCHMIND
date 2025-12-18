// src/utils/ga.js
const gaEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export default gaEvent;
