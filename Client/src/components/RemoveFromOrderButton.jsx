import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

const RemoveFromOrderButton = ({ onRemoveFromOrder }) => {
  return (
    <IconButton onClick={() => {onRemoveFromOrder()}}>
      <RemoveIcon />
    </IconButton>
  );
};

export default RemoveFromOrderButton;
