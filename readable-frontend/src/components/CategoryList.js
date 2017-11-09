import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts"

class CategoryList extends React.Component {
	render() {
		const { categories } = this.props;
		return (
			<div>
				<p>Categories</p>
					{categories.map(category => (
						<li key={category.name}>
							<Link to={`/${category.path}`}>
								{category.name}
							</Link>
						</li>
					))}
					<Posts/>
			</div>
		);
	}
}

export default CategoryList;
