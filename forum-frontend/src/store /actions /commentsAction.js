import axiosApi from "../../axiosApi";

export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';

export const fetchCommentSuccess = comment => ({type: FETCH_COMMENT_SUCCESS, comment});
export const fetchCommentFailure = error => ({type: FETCH_COMMENT_FAILURE, error});

export const getComments = postId => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/comments?postId=' + postId);
            dispatch(fetchCommentSuccess(response.data))
        } catch (error) {
            dispatch(fetchCommentFailure(error))
        }
    }
};
export const sendComment = commentData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/comments', commentData, {headers});
            dispatch(getComments(commentData.post))
        } catch (error) {
            dispatch(fetchCommentFailure(error))
        }
    }
};