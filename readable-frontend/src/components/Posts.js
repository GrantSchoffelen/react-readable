import React, { Component } from "react";
import { getAllPosts } from "../actions/post";
import { connect } from "react-redux";
import Comment from "./Comment";

class Posts extends Component {
	componentDidMount() {
		const { category } = this.props;
		this.props.getAllPosts(category);
	}
	render() {
		const { posts } = this.props;
		return (
			<div>
				posty
				{posts.map(post => (
					<div key={post.id}>
						<li>{post.id}</li>
						<Comment postId={post.id} />
					</div>
				))}
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

function mapDispatchToProps(dispatch) {
	return {
		getAllPosts: category => dispatch(getAllPosts(category))
		// getAllPosts : () => dispatch(getAllPosts()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
