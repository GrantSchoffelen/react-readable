import { GET_ALL_CATEGORIES } from "../actions/category";
import { GET_POSTS } from "../actions/post";
import { GET_COMMENTS } from "../actions/comment";
import { combineReducers } from "redux";

function categories(state = [], action) {
	switch (action.type) {
		case GET_ALL_CATEGORIES: {
			return [...action.categories];
		}
		default: {
			return state;
		}
	}
}

function posts(state = [], action) {
	switch (action.type) {
		case GET_POSTS: {
			return [...action.posts];
		}
		default: {
			return state;
		}
	}
}

function comments(state=[], action){
	switch(action.type){
		case GET_COMMENTS: {
			return [...action.comments]
		}
		default: {
			return state;
		}
	}
}

const rootReducer = combineReducers({
	categories,
	posts,
	comments
});

export default rootReducer;
