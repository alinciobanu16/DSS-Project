export const getCardApi = async (boardId, listId, cardId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching card', error);
  }
};

export const getCardsApi = async (boardId, listId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}/cards`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching cards', error);
  }
};

export const saveCardApi = async (boardId, listId, card) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}/cards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding card', error);
  }
};

export const editCardApi = async (boardId, listId, cardId, card) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error editing card', error);
  }
};

export const deleteCardApi = async (boardId, listId, cardId) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting card', error);
  }
};
