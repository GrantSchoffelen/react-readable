import * as api from "../utils/api";

export const GET_COMMENTS = "GET_COMMENTS";
export const POST_COMMENT_VOTE = "POST_COMMENT_VOTE";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

function getAll(comments) {
	return {
		type: GET_COMMENTS,
		comments
	};
}

function deleteCommentComplete(commentId){
	return {
		type: DELETE_COMMENT,
		commentId
	}
}

function addComment(comment){
	return {
		type: CREATE_COMMENT,
		comment
	}
}

function castVoteComment(comment){
	return {
		type: POST_COMMENT_VOTE,
		comment
	}
}

function updateCommentInfo(comment){
	return {
		type: UPDATE_COMMENT,
		comment
	}
}


export function deleteComment(commentId){
	return dispatch => {
		return api.deleteComment(commentId).then(data => dispatch(deleteCommentComplete(data)))
	}
}

export function getComments(postId) {
	return dispatch => {
		return api.getComments(postId).then(data => dispatch(getAll(data)));
	};
}

export function postCommentVote(commentId, vote){
	return dispatch =>{
		return api.postCommentVote(commentId, vote).then(data => dispatch(castVoteComment(data)))
	}
}


export function createComment(comment){
	return dispatch =>{
		return api.createComment(comment).then(data => dispatch(addComment(data)));
	}
}

export function updateComment(comment){
	return dispatch =>{
		return api.updateComment(comment).then(data => dispatch(updateCommentInfo(data)));
	}
}
