import React, { Component } from "react";
import {connect} from 'react-redux'
 import { withRouter } from "react-router-dom";
 import PostList from '../components/PostList'

class Category extends Component {
	render() {
		const { category } = this.props.match.params;
		return (
			<div>
				<h1>{category}</h1>
				<PostList category={category} />
			</div>
		);
	}
}

export default withRouter(connect()(Category));
