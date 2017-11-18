import React, { Component } from "react";
import { getAllPosts, postVote, deletePost } from "../actions/post";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";


const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		// flexDirection: 'column',
		flexWrap: 'wrap',
        // flex: 1
	},
	post: {
		flex: '0 0 45%',
		border: '5px solid purple',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'textAlign': 'left',
		'flexDirection': 'column',
		'padding': 20,
		'margin': 20
	}
}


class PostList extends Component {
    onPostSubmit = (str) => {
        console.log(str)
    }
	componentDidMount() {
		const { category } = this.props;
		this.props.getAllPosts(category);
	}
     componentWillReceiveProps(nextProps) {
       if (nextProps.category !== this.props.category) {
         this.props.getAllPosts(nextProps.category);
       }
     }
	render() {
		const { posts } = this.props;
		return (
			<div>
				<div style={styles.container}>
				{posts.map(post => (
					<div style={styles.post} key={post.id}>
						Title: {post.title}
						<br/>
						Body: {post.body}
						<br/>
						Author: {post.author}
						<br/>
						Date: {new Date(post.timestamp).toDateString()}
                        <br/>
                        Comments: {post.commentCount}
                        <br/>
                        Vote Score: {post.voteScore}
                        <br/>
                        {post.id}
                        <button onClick={()=>(this.props.postVote('upVote', post.id))}>Up</button>
                        <button onClick={()=>(this.props.postVote('downVote', post.id))}>Down</button>
						<button onClick={()=>(this.props.deletePost(post.id))}>delete</button>
						<Link to={`/post/edit/${post.id}`}> Edit </Link>
						<Link to={`/${post.category}/${post.id}`}> Post Detail </Link>
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
		getAllPosts: category => dispatch(getAllPosts(category)),
        postVote: (vote, postId) => dispatch(postVote(vote, postId)),
		deletePost: (postId) => dispatch(deletePost(postId))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
