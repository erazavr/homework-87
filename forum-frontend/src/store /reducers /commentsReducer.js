import {FETCH_COMMENT_SUCCESS} from "../actions /commentsAction";

const initialState = {
  comments: null
};
const commentsReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
      case FETCH_COMMENT_SUCCESS:
          return {...state, comments: actoin.comment};
      default:
          return state
  }
};

export default commentsReducer;