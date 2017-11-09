import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments } from "../actions/comment";

class Comment extends Component {
	componentDidMount() {
		const postId = this.props.postId;
		this.props.getComments(postId);
	}
	render() {
		const { comments } = this.props;
		return (
			<div>
				{comments.map(comment =>
                     (<div key={comment.id}>
                        {comment.id}
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
