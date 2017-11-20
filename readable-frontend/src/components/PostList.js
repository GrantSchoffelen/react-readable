import React, { Component } from "react";
import {
	getAllPosts,
	postVote,
	deletePost,
	sortAecTime,
	sortDecTime,
	sortAecVote,
	sortDecVote
} from "../actions/post";
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
	componentDidMount() {
		const { category } = this.props;
		this.props.getAllPosts(category);
	}
     componentWillReceiveProps(nextProps) {
       if (nextProps.category !== this.props.category) {
         this.props.getAllPosts(nextProps.category);
       }
     }

	 sortUp(){
		 // this.props.sortAecTime()
	 }
	render() {
		console.log('hit render comp')
		const { posts } = this.props;
		return (
			<div>Sort: 
				<button onClick={()=>{this.props.sortAecTime()}}>Aec Time</button>
				<button onClick={()=>{this.props.sortDecTime()}}>Dec Time</button>
				<button onClick={()=>{this.props.sortAecVote()}}>Aec vote</button>
				<button onClick={()=>{this.props.sortDecVote()}}>Dec vote</button>
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


export default withRouter(connect(mapStateToProps, {
	getAllPosts,
	postVote,
	deletePost,
	sortAecTime,
	sortDecTime,
	sortAecVote,
	sortDecVote
})(PostList));
