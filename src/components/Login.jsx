import React from 'react';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email      : '',
      documentKey: '',
    };
    // bind class methods with `this`
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.documentKey);
  }
  login (email, documentKey) {
    const that = this;
    // make request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/letter/${email}/${documentKey}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.response);
        console.log('response', response);
        if (this.status === 200) {
          let { letter } = response;
          that.setState({
            isLoggedIn: true,
            letter,
          });
        } else {
          that.setState({
            loginError: response.message,
          });
        }
      }
    });
    xhr.send();
  }
  logout () {
    this.setState({isLoggedIn: false, letter: {}});
  }
  render () {
    return (
      <div className="card">
        <div className="card-body">
          <h4>Review Your Letter</h4>
          <p>If you have already received a letter from us, you can log in here to edit your details or request another copy.</p>
          <p style={{color: 'red'}}>{this.props.error}</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.handleInput}/>
                <small id="emailHelp" className="form-text text-muted">We won't share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="documentKey">Document Key</label>
              <input type="password" className="form-control" id="documentKey" name="documentKey" aria-describedby="documentKeyHelp" value={this.state.documentKey} onChange={this.handleInput}/>
                <small id="documentKeyHelp" className="form-text text-muted">Check your email to find your Document Key.</small>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = Login;
