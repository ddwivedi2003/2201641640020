import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type ShortenedUrl = {
  originalUrl: string;
  shortcode: string;
  createdAt: number;
  expiresAt: number;
  clicks: any[];
};

const UrlList: React.FC = () => {
  const [urlItems, setUrlItems] = useState<ShortenedUrl[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (saved) {
      setUrlItems(JSON.parse(saved));
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Your Shortened Links
      </Typography>
      {urlItems.length === 0 ? (
        <Typography>No links have been shortened yet.</Typography>
      ) : (
        urlItems.map((item, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Typography>
              <b>Short Link:</b>{' '}
              <a
                href={`/${item.shortcode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {window.location.origin}/{item.shortcode}
              </a>
              <Tooltip title="Copy link">
                <IconButton
                  size="small"
                  onClick={() =>
                    copyToClipboard(`${window.location.origin}/${item.shortcode}`)
                  }
                  sx={{ ml: 1 }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography>
              <b>Destination:</b> {item.originalUrl}
            </Typography>
            <Typography>
              <b>Expires at:</b> {new Date(item.expiresAt).toLocaleString()}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default UrlList;