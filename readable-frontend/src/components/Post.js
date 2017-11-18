import React, { Component } from "react";
import { getSinglePost } from "../actions/post";
import { createComment } from "../actions/comment";
import { connect } from "react-redux";
import Comment from "./Comment";
import serializeForm from 'form-serialize'
// import { Switch, Route, withRouter } from "react-router-dom";


const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		flex: 1,
		'flexDirection': 'column',
	},
	post: {
		display: 'flex',
		'flexDirection': 'column',
		flex: 1,
		border: '5px solid purple',
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
		'textAlign': 'left',
		'padding': 20,
		'margin': 20
	}
}


class Post extends Component {
	componentDidMount() {
		this.props.getSinglePost(this.props.match.params.postId)
	}

	handleEvent = e => {
        e.preventDefault();
		const comment = serializeForm(e.target, {hash: true})
		comment.parentId = this.props.match.params.postId;
		this.props.createComment(comment)
		.then(this.props.getSinglePost(this.props.match.params.postId))

	}
     // componentWillReceiveProps(nextProps) {
     //   if (nextProps.posts !== this.props.posts) {
     //     this.props.getSinglePost(this.props.match.params.postId)
     //   }
     // }

	render() {
		const { posts } = this.props
		const comment = {};
		return (
			<div>
				<h2>Post</h2>
				<div>
					{posts.map((post)=>{
						if(post.id === this.props.match.params.postId){
							return (<div style={styles.post} key={post.id}>
								Title: {post.title}
								<br/>
								Body: {post.body}
								<br/>
								Author: {post.author}
								<br/>
								Time: {post.timestamp}
								<Comment style={{flex:1}} postId={post.id} />

							</div>)
						}
				})}
				Add Comment
				<form onSubmit={this.handleEvent}>
					<input type='text'
						type="text"
						name="author"
						placeholder="author"
						defaultValue={comment.author}
						>
					</input>
					<br/>
					<input
						type="text"
						name="body"
						placeholder="body"
						defaultValue={comment.body}
						>
					</input>
					<button>Submit</button>
				</form>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	const { posts } = state;
	return {
		posts
	};
}

export default connect(mapStateToProps, {getSinglePost, createComment})(Post);