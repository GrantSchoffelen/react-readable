import { GET_ALL_CATEGORIES } from "../actions/category";
import {
	GET_POSTS,
	POST_VOTE,
	GET_POST,
	DELETE_POST,
	SORT_AEC_TIME,
	SORT_DEC_TIME,
	SORT_AEC_VOTE,
	SORT_DEC_VOTE,

} from "../actions/post";
import { GET_COMMENTS, POST_COMMENT_VOTE, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../actions/comment";
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
		  case SORT_AEC_TIME: {
			  var newState = state.slice()
			  newState.sort((a,b)=>{
				  return a.timestamp - b.timestamp
			  });
			  return newState


		  }
		  case SORT_DEC_TIME: {
			  var newState = state.slice()
				 newState.sort((a,b)=>{
					 return b.timestamp - a.timestamp
				 });
				 return newState
		  }
		  case SORT_AEC_VOTE: {
			  var newState = state.slice()
			  newState.sort((a,b)=>{
				  return a.voteScore - b.voteScore
			  });
			  return newState


		  }
		  case SORT_DEC_VOTE: {
			  var newState = state.slice()
				 newState.sort((a,b)=>{
					 return b.voteScore - a.voteScore
				 });
				 return newState
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
			return state.find(i => i.id === action.comment.id)
			  ? [...state]
			  : [...state, action.comment];
		}
		case DELETE_COMMENT: {
			return state.filter((comment)=>{
				return comment.id !== action.commentId
			})
		}
		case UPDATE_COMMENT: {
			return state.map(comment=>{
				if(comment.id === action.comment.id){
					return action.comment
				}
				return comment
			})
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
