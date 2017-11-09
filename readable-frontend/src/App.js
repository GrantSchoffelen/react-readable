import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import { getAllCategories } from "./actions/category";
import { getAllPosts } from "./actions/post";

import CategoryList from "./components/CategoryList";
import { Switch, Route, withRouter } from "react-router-dom";
import Category from "./components/Category";

class App extends Component {
	componentDidMount() {
		this.props.getAllCategories();
		this.props.getAllPosts()
	}

	render() {
		const { categories } = this.props;
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={() => <CategoryList categories={categories} />}
					/>
					<Route exact path="/:category" component={Category} />
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { categories, posts } = state;
	return {
		categories,
		posts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: () => dispatch(getAllCategories()),
		getAllPosts : () => dispatch(getAllPosts()),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
