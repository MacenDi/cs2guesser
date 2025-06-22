import { Routes } from 'react-router';

import Box from '@mui/material/Box';

import { usePageTracking } from '@/hooks/usePageTracking';
import routes from '..';
import { getPageHeight, renderRoutes } from './utils';

function Pages() {
  // Track page views for analytics
  usePageTracking();

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>{renderRoutes(routes)}</Routes>
    </Box>
  );
}

export default Pages;
