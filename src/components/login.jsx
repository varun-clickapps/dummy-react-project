var React = require('react');
var reactDom = require('react-dom');
var LoginStore = require('../stores/login/login-store.jsx');
var Router = require('react-router');
var Actions = require('../actions.jsx');
var Reflux = require('reflux');
var Link = Router.Link

var Formsy = require('formsy-react');
var Input = require('./input.jsx');


module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(LoginStore,'onChange'),
		Router.History
	],

	getInitialState: function() {
    return {
    	response:[],
      u_name: '',
      u_pass:'',
      canSubmit: false

    };
  },
  componentWillMount: function(){
		this.onAlert()
	},
  handleUsernameChange: function(evt) {
  	//console.log(evt.target.value)
    this.setState({
      u_name: evt.target.value
    });
  },
  handlePasswordChange: function(evt) {

    this.setState({
      u_pass: evt.target.value
    });
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
  handleSubmit: function(model) {
   // e.preventDefault();
    var u_name = model['user']['Email'].trim();
    var u_pass = model['user']['Password'].trim();

    if (!u_pass.length>5 || !u_pass || !u_name) {
    	//alert(u_pass.length+'--'+u_pass+'--'+u_name)
      return;
    }
		Actions.postLogin(u_name,u_pass);
    //this.setState({u_name: '', u_pass: ''});
  },
  
  // notifyFormError: function(modal,resetForm, invalidateForm){
  	
  // 	curRef = this.refs

  // 	Object.keys(modal['user']).map(function(key){
  // 		if(modal['user'][key].trim() == ''){
  // 			reactDom.findDOMNode(curRef[key]).innerHTML= key + ' is required'
  // 		}
  // 	});
  
  // },

  render: function(){
		return <section>
			{this.renderLogin()}
		</section>
	},
	renderLogin: function(){
		
		return (
		<div className="signin">
			<Formsy.Form className="loginForm" id="loginForm" onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} /*onInvalidSubmit={this.notifyFormError}*/>
				
				<div className="panel panel-signin">
				
					<div className="panel-body">
					    <div className="logo text-center">
					        <img src="images/logo_big.png" alt="Chain Logo" />
					    </div>
					    <div className="mb30"></div>
				      <div className="input-group">
				          <span className="input-group-addon un_txt"><i className="glyphicon glyphicon-user_custom"></i></span>
				          <Input type="text" className="form-control" name="user[Email]" placeholder="Email or EmpID " value={this.state.u_name}  validations={{minLength:3}} validationError="Email or Empid must be at least 3 characters" required  />
				      </div>
				      <label id='user[Email]' className="error" ref="Email" ></label>
				      <div className="input-group">
				          <span className="input-group-addon"><i className="glyphicon glyphicon-lock_custom"></i></span>
				          <Input type="password" className="form-control" name="user[Password]" id="user_pass" placeholder="*******" value={this.state.u_pass}   validations={{minLength:5}} validationError="Password must be at least 5 characters" required/>
				          <Link to="forgotpass" className="forgot_pwd" >Forgot?</Link>
				      </div>
				      <label id="user[Password]" className="error" ref="Password" ></label>
				      <div className="clearfix">
				          <div className="login_btn">
				            <input type="submit" className="btn btn-orange btn-lg btn-full" value='Login' disabled={!this.state.canSubmit}/>
				          </div>
				      </div>  
					</div>
				</div>
			</Formsy.Form>	
		</div>
		);	
	},
	onAlert: function(){
		/* Redirect if current session is active then redirect to compnay setting page */
		if(localStorage.getItem("accessToken") !== null){
			this.history.pushState(null,'company','company')
		}

		if(window.location.toString().split('=')[1] == 1){
			toastr.success('Send you an email. Please check your inbox', {timeOut: 10000})
			this.history.pushState(null,'/','/'); //Used for change the url so that notification will be show only once
		}else if(window.location.toString().split('=')[1] == 2){
			toastr.success('Password changed successfully', {timeOut: 10000})
			this.history.pushState(null,'/','/'); //Used for change the url so that notification will be show only once
		}

	},
	onChange: function(event, response){
		if(response.success!='undefined' && response.success){
			localStorage.removeItem("accessToken");
			localStorage.setItem("accessToken", response.access_token);	
			this.history.pushState(null,'company','company')
		}else{
			toastr.error(response.error, {timeOut: 10000})
		}
		//this.setState({response:response})
		
	}
});

