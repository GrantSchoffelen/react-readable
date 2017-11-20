// import client from '../index.js'
import uuidv1 from 'uuid/v1';
import { client } from '../index.js'

const headers = {
	Authorization: "admin",
	"Content-type": "application/json"
};
//
// export const client = axios.create({
//   baseURL:'http://localhost:3001',
//   headers: headers
// });

const apiUrl = "http://localhost:3001";


export const getAllCategories = () => {
	return client.get(`${apiUrl}/categories`)
		.then(data => data.data.categories);
};

export const getPosts = category => {
	const endPoint = category ? `${category}/posts` : `posts`;
	return client.get(`${apiUrl}/${endPoint}`)
		.then(data => data.data);
};

export const getSinglePost = (postId) =>{
	return client.get(`${apiUrl}/posts/${postId}`)
		.then(data => data.data)
}

export const postVote = (vote, postId) => {
	const option = vote;

	return fetch(`${apiUrl}/posts/${postId}`,
		{
    		method: "POST",
    		headers,
    		body: JSON.stringify({ option })
  		})
		.then(res => res.json())
		.then(data => data);
};

export const updatePost = (post) => {
  return client.put(`${apiUrl}/posts/${post.id}`, post)
  	.then(data => data.data)
}

export const updateComment = (comment) => {
	console.log('hitsz', comment)
  return client.put(`${apiUrl}/comments/${comment.id}`, comment)
  	.then(data => data.data)
}

export const deletePost = (postId)=>{
	return client.delete(`${apiUrl}/posts/${postId}`)
	.then(data=> data.data)
}

export const getComments = postId => {
	const endPoint = `posts/${postId}/comments`;
	return fetch(`${apiUrl}/${endPoint}`, { headers })
		.then(res => res.json())
		.then(data => data);
};

export const postCommentVote = (commentId, vote) => {
	const option = vote;
	return client.post(`${apiUrl}/comments/${commentId}`, JSON.stringify({option}))
		.then(data => data.data)
}

export const createComment = (comment) => {
	comment.id = uuidv1();
	comment.timestamp = Date.now();
	return client.post(`${apiUrl}/comments`, comment)
		.then( data=> data.data )
}

export const createPost = (post) => {
	post.id = uuidv1();
	post.timestamp = Date.now();
	return client.post(`${apiUrl}/posts`, post)
		.then(data => data.data);
};

export const deleteComment =(commentId) =>{
	return client.delete(`${apiUrl}/comments/${commentId}`)
	.then(data => data.data.id)
}
