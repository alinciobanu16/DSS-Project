// components/CustomCard.js

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteBoardApi, editBoardApi } from '../utils/api/boardApi';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '16px',
    marginTop: '100px',
    marginBottom: '-16px',
    height: '200px',
  },
  button: {
    marginRight: '8px',
    padding: '6px 12px',
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

export default function Board({ name, id, updateBoardName, deleteBoard }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [boardName, setBoardName] = useState(name);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openModel = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = async () => {
    const data = await editBoardApi(id, boardName);
    setBoardName(data.name);
    updateBoardName(id, data.name);
    closeModal();
  };

  const onDelete = async () => {
    await deleteBoardApi(id);
    deleteBoard(id);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={classes.card}
        sx={{
          maxWidth: 345,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://source.unsplash.com/random)',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="h5" component="div">
              <Link
                href={`/boards/${id}`}
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <Button variant="contained">{name}</Button>
              </Link>
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={openModel}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Modal className={classes.modal} open={isModalOpen} onClose={closeModal}>
        <div className={classes.modalContent}>
          <TextField
            label="Board name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" onClick={onEdit}>
            Save
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </Grid>
  );
}
