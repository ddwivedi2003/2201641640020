import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Alert } from '@mui/material';
import { isValidUrl, generateShortcode, MAX_URLS, DEFAULT_VALIDITY } from './urlUtils';

interface UrlInput {
  originalUrl: string;
  validity: string;
  customCode: string;
}

const UrlShortenerForm: React.FC = () => {
  const [inputs, setInputs] = useState<UrlInput[]>(
    Array(MAX_URLS).fill({ originalUrl: '', validity: '', customCode: '' })
  );
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (index: number, field: keyof UrlInput, value: string) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Get existing shortcodes
    const stored = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const existingCodes = stored.map((u: any) => u.shortcode);

    const newUrls = [];
    const usedCodes = new Set(existingCodes);

    for (let i = 0; i < inputs.length; i++) {
      const { originalUrl, validity, customCode } = inputs[i];
      if (!originalUrl.trim()) continue;

      if (!isValidUrl(originalUrl)) {
        setError(`Row ${i + 1}: Invalid URL`);
        return;
      }

      let code = customCode.trim() || generateShortcode();
      if (!isUniqueShortcode(code, existingCodes)) {
        setError(`Row ${i + 1}: Shortcode "${code}" already exists`);
        return;
      }
      usedCodes.add(code);

      let validMinutes = parseInt(validity, 10);
      if (isNaN(validMinutes) || validMinutes <= 0) validMinutes = DEFAULT_VALIDITY;

      const now = Date.now();
      newUrls.push({
        originalUrl,
        shortcode: code,
        createdAt: now,
        expiresAt: now + validMinutes * 60 * 1000,
        clicks: [],
      });
    }

    if (newUrls.length === 0) {
      setError('Please enter at least one valid URL.');
      return;
    }

    localStorage.setItem('shortenedUrls', JSON.stringify([...stored, ...newUrls]));
    setSuccess('URLs shortened successfully!');
    setInputs(Array(MAX_URLS).fill({ originalUrl: '', validity: '', customCode: '' }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle1" mb={2}>
        Enter up to {MAX_URLS} URLs to shorten
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={2}>
        {inputs.map((input, idx) => (
          <Grid item xs={12} key={idx}>
            <Box display="flex" gap={2}>
              <TextField
                label="Long URL"
                variant="outlined"
                fullWidth
                value={input.originalUrl}
                onChange={e => handleChange(idx, 'originalUrl', e.target.value)}
              />
              <TextField
                label="Validity (minutes)"
                variant="outlined"
                type="number"
                value={input.validity}
                onChange={e => handleChange(idx, 'validity', e.target.value)}
                sx={{ width: 150 }}
              />
              <TextField
                label="Custom Shortcode"
                variant="outlined"
                value={input.customCode}
                onChange={e => handleChange(idx, 'customCode', e.target.value)}
                sx={{ width: 180 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button type="submit" variant="contained">
          Shorten URLs
        </Button>
      </Box>
    </Box>
  );
};

export default UrlShortenerForm;