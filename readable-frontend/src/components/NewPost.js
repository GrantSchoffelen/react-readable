import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { addPost, getSinglePost, updatePost } from '../actions/post'

class NewPost extends Component {

	componentDidMount(){
		if(this.props.match.params.id){
			this.props.getSinglePost(this.props.match.params.id)
		}
	}


	handleEvent = e => {
        e.preventDefault();
		const post = serializeForm(e.target, {hash: true})
		var currentPost = this.props.posts.filter((post)=>{
			if(post.id === this.props.match.params.id){
				return post;
			}
		})[0];
		if (currentPost) {
			currentPost.author = post.author
      		currentPost.title = post.title
      		currentPost.body = post.body
      		currentPost.category = post.category
      		this.props.updatePost(currentPost).then(this.props.history.push("/"))
    	} else {
      		this.props.addPost(post).then(this.props.history.push("/"))
    	}

	};


	render() {
		const { categories, posts } = this.props;
		var currentPost = posts.filter((post)=>{
			if(post.id === this.props.match.params.id){
				return post;
			}
			return false
		})[0];

		// if(currentPost === undefined){
		// 	currentPost = {
		// 		author: 'a',
		// 		title: 'b',
		// 		body: 'c'
		// 	}
		// }
		// console.log(currentPost)
		return (
			<div>
				{/* {currentPost.author} */}
				<form onSubmit={this.handleEvent}>
					<div>
                        <input
							type="text"
							name="author"
							placeholder="author"
							defaultValue={currentPost && currentPost.author}
						/>
                        <br />
						<input
							type="text"
							name="title"
							placeholder="title"
							defaultValue={ currentPost && currentPost.title}
						/>
						<br />
						<textarea
							type="text"
							name="body"
							placeholder="body"
							defaultValue={currentPost && currentPost.body}
						/>
						<br />
						<select
							name="category"
							// readOnly
							defaultValue={
								currentPost ? currentPost.category : 'redux'
							}
						>
							{categories.map(category => (
								<option
									value={category.name}
									key={category.name}
								>
									{category.name}
								</option>
							))}
						</select>
						<button>{currentPost ? "Update Post" : "Create Post"}</button>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { categories, posts } = state;
	return {
		categories,
		posts
	};
}

export default withRouter(connect(mapStateToProps, {addPost, getSinglePost, updatePost})(NewPost));
