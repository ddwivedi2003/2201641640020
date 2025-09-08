import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShortUrlRedirect: React.FC = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve all shortened URLs from localStorage
    const allUrls = localStorage.getItem('shortenedUrls');
    let found = null;
    if (allUrls) {
      const urlList = JSON.parse(allUrls);
      found = urlList.find((item: any) => item.shortcode === shortcode);
    }

    // If not found or expired, go home
    if (!found || Date.now() > found.expiresAt) {
      navigate('/');
      return;
    }

    // Track click analytics
    if (!Array.isArray(found.clicks)) found.clicks = [];
    found.clicks.push({
      timestamp: Date.now(),
      source: document.referrer,
      location: window.location.href,
    });

    // Update localStorage with new click
    const updatedList = (allUrls ? JSON.parse(allUrls) : []).map((item: any) =>
      item.shortcode === shortcode ? found : item
    );
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedList));

    // Redirect to the original URL
    window.location.replace(found.originalUrl);
  }, [shortcode, navigate]);

  return <span>Redirecting to your destination...</span>;
};

export default ShortUrlRedirect;