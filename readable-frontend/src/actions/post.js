import * as api from "../utils/api";


export const GET_POSTS = "GET_POSTS";
export const POST_VOTE = "POST_VOTE";
export const CREATE_POST = "CREATE_POST";
export const GET_POST = "GET_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

function getPosts(posts) {
	return {
		type: GET_POSTS,
		posts
	};
}

function deletePostComplete(postId){
	return {
		type: DELETE_POST,
		postId
	}
}

function castVotePost(post) {
  return {
    type : POST_VOTE,
    post
  }
}

function createPost(post) {
  return {
    type : CREATE_POST,
    post
  }
}

function getPost(post) {
  return {
    type : GET_POST,
    post
  }
}

function updatePostComplete(post) {
  return {
    type : UPDATE_POST,
    post
  }
}

export function deletePost(postId){
	return dispatch =>{
		return api.deletePost(postId)
		.then(dispatch(deletePostComplete(postId)))
	}
}

export function updatePost(post){
	return dispatch =>{
		return api.updatePost(post)
		.then(dispatch(updatePostComplete(post)))
	}
}

export function getSinglePost(postId){
	return dispatch =>{
		return api.getSinglePost(postId)
		.then(post =>
			dispatch(getPost(post)))
	}
}

export function postVote(vote, postId) {
  return dispatch => {
    api.postVote(vote, postId).then(data => {
      dispatch(castVotePost(data))
    })
  }
}

export function getAllPosts(category) {
	return dispatch => {
		return api.getPosts(category).then(posts => dispatch(getPosts(posts)));
	};
}


export function addPost(post){
	return dispatch => {
		return api.createPost(post).then(posts => dispatch(createPost(post)));
	}
}
