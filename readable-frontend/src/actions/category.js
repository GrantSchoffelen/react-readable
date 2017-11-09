import * as api from "../utils/api";

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

function getAll(categories) {
	return {
		type: GET_ALL_CATEGORIES,
		categories
	};
}

export function getAllCategories() {
	return dispatch => {
		return api.getAllCategories().then(data => dispatch(getAll(data)));
	};
}
