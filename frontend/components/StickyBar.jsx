// StickyBar.js

import React from 'react';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { saveBoardApi } from '../utils/api/boardApi';
import { saveListApi } from '../utils/api/listApi';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
    top: 0,
  },
  button: {
    marginLeft: '16px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '16px',
  },
}));

export default function StickyBar({
  mode,
  addNewBoard,
  addNewList,
  boardId,
  title,
}) {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const openModel = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'board') {
        const data = await saveBoardApi(itemName);
        addNewBoard();
        setItemName('');
        closeModal();
      } else if (mode === 'list') {
        const data = await saveListApi(boardId, itemName);
        addNewList();
        setItemName('');
        closeModal();
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={openModel}
        >
          {mode === 'board' ? 'Add New Board' : 'Add New List'}
        </Button>
        <Link href="/">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Go back
          </Button>
        </Link>
        <Modal
          className={classes.modal}
          open={isModalOpen}
          onClose={closeModal}
        >
          <div className={classes.modalContent}>
            <TextField
              label={mode === 'board' ? 'Board Name' : 'List Name'}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={closeModal}>Anulează</Button>
          </div>
        </Modal>
      </Toolbar>
    </AppBar>
  );
}
