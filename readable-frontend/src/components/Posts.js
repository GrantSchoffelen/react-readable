import React, { Component } from "react";
import { getAllPosts } from "../actions/post";
import { connect } from "react-redux";
import Comment from "./Comment";


const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		flex: 1
	},
	post: {
		// flex: 1,
		border: '5px solid purple',
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
		'textAlign': 'left',
		'flexDirection': 'column',
		'padding': 20,
		'margin': 20
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
					<div style={styles.post} key={post.id}>
						Title: {post.title}
						<br/>
						Body: {post.body}
						<br/>
						Author: {post.author}
						<br/>
						Time: {post.timestamp}
						<Comment style={{flex:1}} postId={post.id} />

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
