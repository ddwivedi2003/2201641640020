import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../logging-middleware/logger';

const ShortUrlRedirect: React.FC = () => {
  const navigate = useNavigate();
  const shortcode = 'exampleShortcode'; // This should come from props or context in real usage

  useEffect(() => {
    // Log the click event with relevant data
    logger.log('click', {
      shortcode,
      timestamp: Date.now(),
      source: document.referrer,
      location: window.location.href,
    });

    // Here should be the code to handle the redirection
    // For example, navigating to the actual URL
    // navigate(`/actual-url-based-on/${shortcode}`);
  }, [shortcode, navigate]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default ShortUrlRedirect;