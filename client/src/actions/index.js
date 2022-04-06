// action types
export const ADD_TO_POST = "ADD_TO_POST";
export const DELETE_FROM_POST = "DELETE_FROM_POST";
export const ADD_TO_HASHTAG = "ADD_TO_HASHTAG";
export const DELETE_FROM_HASHTAG = "DELETE_FROM_HASHTAG";

// actions creator functions
export const addToPost = (itemId) => {
  return {
    type: ADD_TO_POST,
    payload: {
      //   quantity: 1,
      //   itemId,
    },
  };
};

export const deleteFromPost = (itemId) => {
  return {
    type: DELETE_FROM_POST,
    payload: {},
  };
};

export const addToHashtag = (itemId) => {
  return {
    type: ADD_TO_HASHTAG,
    payload: {},
  };
};

export const deleteFromHashtag = (itemId) => {
  return {
    type: DELETE_FROM_HASHTAG,
    payload: {},
  };
};
