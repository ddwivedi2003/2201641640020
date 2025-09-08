import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Button } from '@mui/material';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import ShortUrlRedirect from './components/ShortUrlredirect';

const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" href="/">Shortener</Button>
        <Button color="inherit" href="/stats">Statistics</Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<ShortUrlRedirect />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;