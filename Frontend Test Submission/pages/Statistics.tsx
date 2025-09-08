import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

type ClickDetail = {
  timestamp: number;
  source: string;
  location: string;
};

type UrlRecord = {
  originalUrl: string;
  shortcode: string;
  createdAt: number;
  expiresAt: number;
  clicks: ClickDetail[];
};

const Statistics: React.FC = () => {
  const [records, setRecords] = useState<UrlRecord[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('shortenedUrls');
    if (data) {
      setRecords(JSON.parse(data));
    }
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Shortened URL Analytics
      </Typography>
      {records.length === 0 ? (
        <Typography>No data available.</Typography>
      ) : (
        records.map((rec, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 3 }}>
            <Typography>
              <strong>Code:</strong> {rec.shortcode}
            </Typography>
            <Typography>
              <strong>Target URL:</strong> {rec.originalUrl}
            </Typography>
            <Typography>
              <strong>Created:</strong> {new Date(rec.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Expires:</strong> {new Date(rec.expiresAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Clicks:</strong> {rec.clicks.length}
            </Typography>
            {rec.clicks.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">Click Events:</Typography>
                {rec.clicks.map((click, i) => (
                  <Box key={i} sx={{ ml: 2, mb: 1 }}>
                    <Typography>
                      {i + 1}. <strong>Time:</strong> {new Date(click.timestamp).toLocaleString()}
                    </Typography>
                    <Typography>
                      <strong>Source:</strong> {click.source || 'Direct'}
                    </Typography>
                    <Typography>
                      <strong>Location:</strong> {click.location}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Statistics;