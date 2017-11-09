import React, { Component } from "react";
import Posts from "./Posts";

class Category extends Component {
	componentDidMount() {}
	render() {
		const { category } = this.props.match.params;
		return (
			<div>
				<h1>{category}</h1>
				<Posts category={category} />
			</div>
		);
	}
}

export default Category;
