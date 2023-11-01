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
import { useEffect } from 'react';

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

export default function CardContentModal({
  cardData,
  open,
  onClose,
  onEditCard,
}) {
  const classes = useStyles();
  const [card, setCard] = useState(cardData);
  const [cardName, setCardName] = useState(cardData.title);
  const [cardDescription, setCardDescription] = useState(cardData.description);

  const handleEditCard = () => {
    onEditCard(card._id, cardName, cardDescription);
    setCardName('');
    setCardDescription('');
    onClose();
  };

  useEffect(() => {
    setCardName(cardData.title);
    setCardDescription(cardData.description);
  }, [cardData]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={classes.modal}
    >
      <div className={classes.paper}>
        <Typography variant="h6">Edit Card</Typography>
        <Box>
          <TextField
            label="Card Title"
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
          <Button variant="contained" color="primary" onClick={handleEditCard}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </div>
    </Modal>
  );
}
