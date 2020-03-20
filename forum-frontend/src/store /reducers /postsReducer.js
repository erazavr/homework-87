import {FETCH_POST_SUCCESS} from "../actions /postsActions";

const initialState = {
    posts: null
};
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_POST_SUCCESS:
          return {...state, posts: action.post};
      default:
          return state
  }
};

export default postsReducer;