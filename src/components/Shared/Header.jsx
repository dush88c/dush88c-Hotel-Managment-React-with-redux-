import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <div className="navbar-header">
                <i className="fa fa-hotel fa-2x text-white my-auto"></i> &nbsp;
                <a className="navbar-brand" href="#">{props.title}</a>
            </div>
            <ul className="nav navbar-nav">
                <li className="text-white"><a href="/hotels"><span className="text-white">Hotels  &nbsp;  &nbsp; | </span></a></li>
                <li className="text-white"><a href="/hotel/add"><span className="text-white"> &nbsp; &nbsp; &nbsp; &nbsp;Add New Hotel </span></a></li>

            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><span className="glyphicon glyphicon-user text-white">{props.user.username}  &nbsp; | </span> </li>
                <li><a onClick= {()=>props.onLogOut()}><span className="glyphicon glyphicon-log-in text-white">&nbsp; Log out</span> </a></li>
            </ul>
        </div>
    </nav>


);

Header.defaultProps = {
    title: 'Title',
    user: {},
    onLogOut : {}
};

Header.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object,
    onLogOut: PropTypes.func
};

export default Header;