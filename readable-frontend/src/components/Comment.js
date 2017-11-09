import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments } from "../actions/comment";


const styles={
	commentsContainer: {
		border: '1px solid black',
		margin: 10,
		padding: 20
	},
	comment: {
		flex: 1,
		display: 'flex'
	}

}

class Comment extends Component {
	componentDidMount() {
		const postId = this.props.postId;
		this.props.getComments(postId);
	}
	render() {
		const { comments } = this.props;
		return (
			<div>
				<h5>Comments {comments.length}</h5>
				{comments.map(comment =>
                     (<div style={styles.commentsContainer} key={comment.id}>
						 <div style={{justifyContent: 'flex-end'}}>
							 <span style={{fontWeight: 'bold'}}>{comment.author}</span>
							 <span style={{color: 'grey'}}>{comment.timestamp}</span>
						 </div>
						 <div style={styles.comment}>
							 <div>{comment.body}</div>
						 </div>
						  <div>{comment.voteScore}</div>
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
function mapDispatchToProps(dispatch) {
	return {
		getComments: postId => dispatch(getComments(postId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
