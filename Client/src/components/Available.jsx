import React from 'react';
import { Box } from '@mui/material';

const Available = ({ isAvailable }) => {
  const color = isAvailable ? 'chartreuse' : 'red';
  return (
    <Box
      borderRadius="50%"
      width="6px"
      height="6px"
      // backgroundColor={color}
      sx={{
        backgroundColor: color,
        boxShadow: `1px 1px 10px 0.5px ${color}`
      }}
    />
  );
};

export default Available;
