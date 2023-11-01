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

export default function AddListModal({ open, onClose, onAddList }) {
  const classes = useStyles();
  const [listName, setListName] = useState('');

  const handleAddList = () => {
    onAddList(listName);
    setListName('');
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
        <Typography variant="h6">Add List</Typography>
        <Box>
          <TextField
            label="List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddList}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </div>
    </Modal>
  );
}
