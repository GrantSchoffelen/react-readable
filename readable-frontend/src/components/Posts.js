import React, { Component } from "react";
import { getAllPosts } from "../actions/post";
import { connect } from "react-redux";
import Comment from "./Comment";


const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center'
	}
}


class Posts extends Component {
	componentDidMount() {
		const { category } = this.props;
		this.props.getAllPosts(category);
	}

	render() {
		const { posts } = this.props;
		return (
			<div>
				<h2>Posts</h2>
				<div style={styles.container}>
				{posts.map(post => (
					<div key={post.id}>
						{JSON.stringify({post})}
						{post.title}
						<br/>
						{post.body}
						<br/>
						{post.author}
						<br/>
						{post.timestamp}
						<br/>
						{post.commentCount}
						<br/>
						<li>{post.id}</li>
						<Comment postId={post.id} />
					</div>
				))}
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

function mapDispatchToProps(dispatch) {
	return {
		getAllPosts: category => dispatch(getAllPosts(category))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
