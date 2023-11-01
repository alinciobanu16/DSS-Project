import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddCardModal({ open, onClose, onAddCard }) {
  const classes = useStyles();
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  const handleAddCard = () => {
    onAddCard(cardName, cardDescription);
    setCardName('');
    setCardDescription('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={classes.modal}
    >
      <div className={classes.paper}>
        <Typography variant="h6">Add Card</Typography>
        <Box>
          <TextField
            label="Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Card Description"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddCard}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </div>
    </Modal>
  );
}
