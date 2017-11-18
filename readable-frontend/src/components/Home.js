import React, { Component } from "react";
import {connect} from 'react-redux';
import PostList from '../components/PostList'

class Home extends Component {
	render() {
		return (
			<div>
				<h1>Home</h1>
                <PostList/>
			</div>
		);
	}
}

export default connect()(Home);
