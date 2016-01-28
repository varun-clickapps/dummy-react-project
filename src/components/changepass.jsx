var React = require('react');
var ChangePassStore = require('../stores/login/changepass-store.jsx');
var Router = require('react-router');
var Actions = require('../actions.jsx');
var Reflux = require('reflux');
var Formsy = require('formsy-react');
var Input = require('./input.jsx');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ChangePassStore,'onChange'),
    Router.History
  ],

  getInitialState: function() {
    return {
      response:[],
      u_pass:'',
      u_confirm_pass: '',
      canSubmit: false
    };
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  componentWillMount: function(){
    //this.onAlert()
  },
  handleSubmit: function(model) {
    //e.preventDefault();
    
    changePassToken = window.location.toString().split('?')[1]

    var u_confirm_pass = model['user']['password'].trim();
    var u_pass = model['user']['conf_pass'].trim();
    if (u_pass != u_confirm_pass || (!u_pass || !u_confirm_pass)) {
      return;
    }
    // TODO: send request to the server
    Actions.changePass(u_confirm_pass,u_pass,changePassToken);
    //this.setState({u_confirm_pass: '', u_pass: ''});
    
  },
  render: function(){
    return <section>
      {this.renderLogin()}
    </section>
  },
  renderLogin: function(){
    
    return (
      <div className="signin">
      <Formsy.Form className="changePassForm" id="changePassForm" onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <div className="panel panel-signin">
            <div className="panel-body">
                <div className="logo text-center">
                    <img src="images/logo_big.png" alt="Chain Logo" />
                </div>
                <div className="mb30"></div>
                <div className="input-group mb20">
                    <span className="input-group-addon un_txt"><i className="glyphicon glyphicon-lock_custom"></i></span>
                    <Input type="password" className="form-control" id='user_password' name="user[password]" placeholder="New Password" value={this.state.u_pass} validations={{minLength:5}} validationError="Password must be at least 5 characters" required />
                </div>
                <div className="input-group mb20">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock_custom"></i></span>
                    <Input type="password" className="form-control" id='user_confPass' name="user[conf_pass]" placeholder="Confirm Password" value={this.state.u_confirm_pass} validations={{minLength:5}} validationError="Password must be at least 5 characters" required />
                </div>
                
                <div className="clearfix">
                    <div className="login_btn">
                        <input type="submit" className="btn btn-orange btn-lg btn-full" value='Submit' disabled={!this.state.canSubmit}/>
                    </div>
                </div>  
            </div>
          </div>
        </Formsy.Form> 
       </div>
    );  
  },
  onAlert: function(){
    if(window.location.toString().split('=')[1] == 1){
      toastr.success('Send you an email. Please check your inbox', {timeOut: 10000})
      this.history.pushState(null,'/','/');
      //Used for change the url so that notification will be show only once
    }
  },
  onChange: function(event, response){
    this.setState({response:response})
    /*Redirect code for this using Router.Navigation library in mixins */
    if(response.success){
      var state = { 'id': 2};
      this.history.pushState(null,null,state);
    }else{
      toastr.error(response.error, {timeOut: 10000})
    }
  }
});