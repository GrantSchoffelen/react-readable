import { GET_ALL_CATEGORIES } from "../actions/category";
import { GET_POSTS, POST_VOTE, GET_POST, DELETE_POST } from "../actions/post";
import { GET_COMMENTS, POST_COMMENT_VOTE, CREATE_COMMENT } from "../actions/comment";
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
		case POST_VOTE:
	      return state.map(post => {
	        if (post.id === action.post.id) {
	          return action.post
	        }
	        return post
	      })
		  case GET_POST: {
			  return state.find(i => i.id === action.post.id)
				? [...state]
				: [action.post, ...state];
		  }
		  case DELETE_POST: {
			  return state.filter(post=>{
				  return post.id !== action.postId
			  })
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
		case POST_COMMENT_VOTE: {
			return state.map(comment => {
  	        	if (comment.id === action.comment.id) {
  	          		return action.comment
  	        	}
  	        	return comment
  	      	})
		}
		case CREATE_COMMENT:{
			console.log(action.comment)
			return state.find(i => i.id === action.comment.id)
			  ? [...state]
			  : [...state, action.comment,];
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
