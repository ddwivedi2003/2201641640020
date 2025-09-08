import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';

interface UrlInput {
  originalUrl: string;
  validity: string;
  customCode: string;
}

const MAX_URLS = 5;

const UrlShortenerForm: React.FC = () => {
  const [inputs, setInputs] = useState<UrlInput[]>(
    Array(MAX_URLS).fill({ originalUrl: '', validity: '', customCode: '' })
  );

  const handleChange = (index: number, field: keyof UrlInput, value: string) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate and process URLs
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle1" mb={2}>
        Enter up to {MAX_URLS} URLs to shorten
      </Typography>
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