import * as api from "../utils/api";

export const GET_COMMENTS = "GET_COMMENTS";

function getAll(comments) {
	return {
		type: GET_COMMENTS,
		comments
	};
}

export function getComments(postId) {
	return dispatch => {
		return api.getComments(postId).then(data => dispatch(getAll(data)));
	};
}
