import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments, postCommentVote, deleteComment, updateComment } from "../actions/comment";
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import serializeForm from 'form-serialize'


const styles={
	commentsContainer: {
		border: '1px solid black',
		margin: 10,
		padding: 20
	},

}

class Comment extends Component {
	constructor(props) {
      super(props);
	  this.state = {
			editComment: null
		}
      this.handleSubmit = this.handleSubmit.bind(this);
    }



	componentDidMount() {
		const postId = this.props.postId;
		this.props.getComments(postId)
	}

	editComment(commentId){
		this.setState({editComment: commentId})
	}
	handleSubmit(e){
		e.preventDefault();
		const comment = serializeForm(e.target, {hash: true})

		comment.id = this.state.editComment
		this.props.updateComment(comment)
		this.setState({editComment: null})
	}

	render() {
		const { comments } = this.props;
		return (
			<div>
				<h5>Comments {comments.length}</h5>
				{comments.map((comment) =>{

					if(comment.id === this.state.editComment){
						return (<div style={styles.commentsContainer} key={comment.id}>
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									name="author"
									placeholder="author"
									defaultValue={comment.author}
								/>
								<br />
							<input
								type="text"
								name="body"
								placeholder="body"
								defaultValue={comment.body}
							/>
							<button type='submit'>Update</button>
						</form>
					</div>
						</div>)
					}else{
						return (<div style={styles.commentsContainer} key={comment.id}>
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<span style={{fontWeight: 'bold'}}>{comment.author}</span>
								<span style={{color: 'grey'}}>{new Date(comment.timestamp).toDateString()}</span>
							</div>
							<div style={{padding: 10}}>{comment.body}</div>
							<div>{comment.voteScore}</div>
							<button onClick={()=>(this.props.postCommentVote(comment.id, 'upVote'))}><FontAwesome color="black" name='thumbs-up' /></button>
							<button onClick={()=>(this.props.postCommentVote(comment.id, 'downVote'))}><FontAwesome color="black" name='thumbs-down' /></button>
							<button onClick={()=>{this.props.deleteComment(comment.id)}}><FontAwesome color="black" name='ban' /></button>
							<button onClick={()=>{this.editComment(comment.id)}}><FontAwesome color="black" name='pencil' /></button>
						</div>)
					}
				}
                )}
			</div>
        )
    }
}

function mapStateToProps(state) {
	const { comments } = state;
	return {
		comments,
		editMode: false
	};
}


export default withRouter(connect(mapStateToProps, {getComments, postCommentVote, deleteComment, updateComment})(Comment));
