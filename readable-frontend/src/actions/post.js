import * as api from "../utils/api";

export const GET_POSTS = "GET_POSTS";

function getPosts(posts) {
	return {
		type: GET_POSTS,
		posts
	};
}

export function getAllPosts(category) {
	return dispatch => {
		return api.getPosts(category).then(posts => dispatch(getPosts(posts)));
	};
}
