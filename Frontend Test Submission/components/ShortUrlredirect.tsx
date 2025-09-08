import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logger from '../../logging-middleware/logger';

const ShortUrlRedirect: React.FC = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allUrls = localStorage.getItem('shortenedUrls');
    let found = null;
    if (allUrls) {
      const urlList = JSON.parse(allUrls);
      found = urlList.find((item: any) => item.shortcode === shortcode);
    }

    if (!found || Date.now() > found.expiresAt) {
      navigate('/');
      return;
    }

    logger.log('click', {
      shortcode,
      timestamp: Date.now(),
      source: document.referrer,
      location: window.location.href,
    });

    if (!Array.isArray(found.clicks)) found.clicks = [];
    found.clicks.push({
      timestamp: Date.now(),
      source: document.referrer,
      location: window.location.href,
    });

    const updatedList = (allUrls ? JSON.parse(allUrls) : []).map((item: any) =>
      item.shortcode === shortcode ? found : item
    );
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedList));

    window.location.replace(found.originalUrl);
  }, [shortcode, navigate]);

  return <span>Redirecting to your destination...</span>;
};

export default ShortUrlRedirect;