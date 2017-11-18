import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Navbar from './components/Navbar'

import { getAllCategories } from "./actions/category";
import { getAllPosts } from "./actions/post";

// import CategoryList from "./components/CategoryList";
import { Switch, Route, withRouter } from "react-router-dom";
import Category from "./components/Category";
import Home from './components/Home'
import NewPost from './components/NewPost'
import Post from './components/Post'

class App extends Component {
	componentDidMount() {
		this.props.getAllCategories();
	}

	render() {
		// const { categories } = this.props;
		return (
			<div className="App">
				<Navbar/>
				<Switch>
					<Route exact path="/" component = { Home }/>
					<Route exact path="/:category" component={ Category } />
					<Route exact path="/post/add" component={ NewPost } />
					<Route exact path="/post/edit/:id" component={ NewPost } />
					<Route exact path='/:category/:postId' component={ Post } />
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { categories } = state;
	return {
		categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: () => dispatch(getAllCategories()),
		getAllPosts : () => dispatch(getAllPosts()),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
