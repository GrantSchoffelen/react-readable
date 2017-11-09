const apiUrl = "http://localhost:3001";

const headers = {
	Authorization: "admin",
	"Content-type": "application/json"
};

export const getAllCategories = () => {
	return fetch(`${apiUrl}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories);
};

export const getPosts = category => {
	const endPoint = category ? `${category}/posts` : `posts`;
	console.log(endPoint)
	return fetch(`${apiUrl}/${endPoint}`, { headers })
		.then(res => res.json())
		.then(data => data);
};

export const getComments = postId => {
	const endPoint = `posts/${postId}/comments`;
	return fetch(`${apiUrl}/${endPoint}`, { headers })
		.then(res => res.json())
		.then(data => data);
};
