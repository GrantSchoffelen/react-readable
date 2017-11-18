import React, { Component } from "react";
import { NavLink, Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {Menu} from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu>
            <Menu.Item>
                <Link to='/'>
                    All Categories
                </Link>
            </Menu.Item>
            {this.props.categories.map(path => (
                <Menu.Item key={path.name}>
                    <Link to={`/${path.path}`}>{path.name}</Link>
                </Menu.Item>
            ))}
            <Menu.Item>
                <NavLink strict to="/post/add">New Post</NavLink>
            </Menu.Item>
        </Menu>
    </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default withRouter(connect(mapStateToProps)(Navbar));
