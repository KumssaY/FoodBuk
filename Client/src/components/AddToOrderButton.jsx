import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';;

const AddToOrderButton = ({ onAddToOrder }) => {
  return (
    <IconButton onClick={onAddToOrder}>
      <AddIcon />
    </IconButton>
  );
};

export default AddToOrderButton;
