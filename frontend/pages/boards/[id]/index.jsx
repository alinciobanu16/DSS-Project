import { Typography, TextField, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import List from '../../../components/List';
import { makeStyles } from '@mui/styles';
import StickyBar from '../../../components/StickyBar';
import { getListsApi } from '../../../utils/api/listApi';
import { getBoardApi } from '../../../utils/api/boardApi';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: '8px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width: '200px',
    textAlign: 'center',
  },
  listTitle: {
    fontSize: '18px',
  },
  card: {
    margin: '8px 0',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'center',
  },
}));

export default function ListPage({ id, name }) {
  const classes = useStyles();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const lists = await getListsApi(id);
      setLists(lists);
    };

    fetchData();
  }, [id]);

  const addNewList = async () => {
    const lists = await getListsApi(id);
    setLists(lists);
  };

  const updateListName = (listId, newName) => {
    const updatedLists = lists.map((list) => {
      if (list._id === listId) {
      }
      return { ...list, name: newName };
    });

    setLists(updatedLists);
  };

  const deleteList = (listId) => {
    const updatedLists = lists.filter((list) => list._id !== listId);
    setLists(updatedLists);
  };

  return (
    <>
      <StickyBar
        key={id}
        title={name}
        mode="list"
        addNewList={addNewList}
        boardId={id}
      />

      <div>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          {name}
        </Typography>
      </div>
      <div>
        {lists?.map((list) => (
          <div key={list._id} className={classes.list}>
            <List
              key={list._id}
              listId={list._id}
              name={list.name}
              cards={list.cards}
              updateListName={updateListName}
              deleteList={deleteList}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const board = await getBoardApi(params.id);

  return {
    props: {
      id: params.id,
      name: board.name,
    },
  };
}
