import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts"


const styles={
	container:{
		display: 'flex',
		flex: 1,
		'justifyContent': 'space-around',
		'flexDirection': 'row'
	}

}
class CategoryList extends React.Component {
	render() {
		const { categories } = this.props;
		return (
			<div>
				<h1>Categories</h1>
				<div style={styles.container}>
					{categories.map(category => (
						<div key={category.name}>
							<Link to={`/${category.path}`}>
								{category.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default CategoryList;
