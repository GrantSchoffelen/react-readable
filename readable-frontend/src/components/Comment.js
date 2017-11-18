import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments, postCommentVote } from "../actions/comment";
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';


const styles={
	commentsContainer: {
		border: '1px solid black',
		margin: 10,
		padding: 20
	},

}

class Comment extends Component {
	componentDidMount() {
		const postId = this.props.postId;
		this.props.getComments(postId)
	}
	render() {
		const { comments } = this.props;
		console.log(comments, 'comments')
		return (
			<div>
				<h5>Comments {comments.length}</h5>
				{comments.map(comment =>
                     (<div style={styles.commentsContainer} key={comment.id}>
						 <div style={{display: 'flex', justifyContent: 'space-between'}}>
							 <span style={{fontWeight: 'bold'}}>{comment.author}</span>
							 <span style={{color: 'grey'}}>{new Date(comment.timestamp).toDateString()}</span>
						 </div>
							 <div style={{padding: 10}}>{comment.body}</div>
						  <div>{comment.voteScore}</div>
						  <button onClick={()=>(this.props.postCommentVote(comment.id, 'upVote'))}><FontAwesome color="black" name='thumbs-up' /></button>
						  <button onClick={()=>(this.props.postCommentVote(comment.id, 'downVote'))}><FontAwesome color="black" name='thumbs-down' /></button>
                    </div>)
                )}
			</div>
        )
    }
}

function mapStateToProps(state) {
	const { comments } = state;
	return {
		comments
	};
}


export default withRouter(connect(mapStateToProps, {getComments, postCommentVote})(Comment));
