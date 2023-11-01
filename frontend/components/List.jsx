import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Menu,
  Modal,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Add from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCardModal from './modals/AddCardModal';
import CardContentModal from './modals/CardContentModal';
import { deleteListApi, editListApi } from '../utils/api/listApi';
import { deleteCardApi, saveCardApi, editCardApi } from '../utils/api/cardApi';

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

export default function List({
  listId,
  name,
  cards,
  updateListName,
  deleteList,
}) {
  const [cardsData, setCardsData] = useState(cards);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [isCardContentModalOpen, setCardContentModalOpen] = useState(false);
  const [listName, setListName] = useState(name);
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
    cardId: null,
  });
  const router = useRouter();
  const { id } = router.query;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openListModal = () => {
    setListModalOpen(true);
  };

  const closeModal = () => {
    setListModalOpen(false);
  };

  const openCardContentModal = (card) => {
    setCardContentModalOpen(true);
    setCardData(card);
  };

  const onEditList = async () => {
    const data = await editListApi(id, listId, listName);
    setListName(data.name);
    updateListName(listId, data.name);
    closeModal();
  };

  const onDelete = async () => {
    await deleteListApi(id, listId);
    deleteList(listId);
  };

  const handleSaveCard = async (title, description) => {
    const data = await saveCardApi(id, listId, { title, description });
    setCardContentModalOpen(false);
    updateCards(data);
  };

  const handleDeleteCard = async (cardId) => {
    await deleteCardApi(id, listId, cardId);
    const newCards = cardsData.filter((card) => card._id !== cardId);
    setCardsData(newCards);
  };

  const updateCards = (card) => {
    setCardsData([...cardsData, card]);
  };

  const handleEditCard = async (cardId, title, description) => {
    const data = await editCardApi(id, listId, cardId, { title, description });
    const newCards = cardsData.map((card) => {
      if (card._id === cardId) {
        return data;
      }
      return card;
    });

    setCardsData(newCards);
    setCardData({
      title: '',
      description: '',
      cardId: null,
    });
  };

  return (
    <div>
      <div>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          {listName}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
      </div>
      {cardsData?.length
        ? cardsData.map((card) => (
            <Card
              key={card._id}
              sx={{ marginTop: '7px', position: 'relative' }}
            >
              <IconButton
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                }}
                onClick={() => handleDeleteCard(card._id)}
              >
                <CancelIcon />
              </IconButton>
              <CardContent>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    openCardContentModal(card);
                  }}
                >
                  <Typography variant="">{card.title}</Typography>
                </Button>
                <Typography>{card.description}</Typography>
              </CardContent>
            </Card>
          ))
        : null}

      <IconButton
        className={classes.button}
        onClick={() => setCardModalOpen(true)}
      >
        <Add />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={openListModal}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Modal
        className={classes.modal}
        open={isListModalOpen}
        onClose={closeModal}
      >
        <div className={classes.modalContent}>
          <TextField
            label="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" onClick={onEditList}>
            Save
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>

      <AddCardModal
        open={isCardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onAddCard={handleSaveCard}
      ></AddCardModal>

      {isCardContentModalOpen ? (
        <CardContentModal
          cardData={cardData}
          open={isCardContentModalOpen}
          onClose={() => setCardContentModalOpen(false)}
          onEditCard={handleEditCard}
        />
      ) : null}
    </div>
  );
}
