import React from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../actions';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            active: true,
            fieledInput: false
        };
    }

    componentDidMount() {
        this.props.logout();
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    openForm = () => {
        this.setState({ active: true });
    }
    checkInput = (input) => {
        if (input.target.value.length > 0) {
            this.setState({ fieledInput: true });
        } else {
            this.setState({ fieledInput: false });
        }
    }

    closeForm = () => {
        this.setState({ active: false });
    }
    render() {

        const { username, password, submitted, active, fieledInput } = this.state;
        return (
            <div className="form-body">
                <div className={active ? "active" : ""} id="mainButton">
                    <div className="btn-text" onClick={() => this.openForm()}>Sign In</div>
                    <div className="modal">
                        <div className="close-button" onClick={() => this.closeForm()}>x</div>
                        <div className="form-title">Sign In</div>
                        <div className="input-group">
                            <input type="text" name="username" value={username} onChange={this.handleChange} className={fieledInput ? "active" : ""} id="name" onBlur={(e) => this.checkInput(e)} />
                            {submitted && !username &&
                                <div className="help-block text-danger">Username is required</div>
                            }
                            <label for="name" style={{fontSize: '16px'}}>Username</label>
                        </div>
                        <div className="input-group">
                            <input type="password" name="password" value={password} onChange={this.handleChange} className={fieledInput ? "active" : ""} id="password"  onBlur={(e) => this.checkInput(e)} />
                            {submitted && !password &&
                                <div className="help-block text-danger">Password is required</div>
                            }
                            <label for="password" style={{fontSize: '16px'}}>Password</label>
                        </div>
                        <button type="submit" className="form-button" onClick={(e) => this.handleSubmit(e)}>Go</button>
                        <div className="codepen-by">Hotel Management -  Developed By Dushmantha</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = {
    login: authActions.login,
    logout: authActions.logOut
};

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };