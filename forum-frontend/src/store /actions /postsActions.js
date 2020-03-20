import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const fetchPostRequest = () => ({type: FETCH_POST_REQUEST});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const fetchPostFailure = error => ({type: FETCH_POST_FAILURE, error});

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(fetchPostRequest());
            const response = await axiosApi.get('/posts');
            dispatch(fetchPostSuccess(response.data))
        } catch (error) {
            fetchPostFailure(error)
        }
    }
};
export const getOnePost = id => {
    return async dispatch => {
        try {
            dispatch(fetchPostRequest());
            const response = await axiosApi.get('/posts?post=' + id);
            dispatch(fetchPostSuccess(response.data))
        } catch (error) {
            fetchPostFailure(error)
        }
    }
};
export const sendPost = postData => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchPostRequest());
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/posts', postData,{headers});
            dispatch(fetchPostSuccess());
            dispatch(push('/'));
        } catch (error) {
            console.log(error);
            dispatch(fetchPostFailure(error))
        }
    }
};
