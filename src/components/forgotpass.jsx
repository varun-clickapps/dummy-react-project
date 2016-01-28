var React = require('react');
var ForgotStore = require('../stores/login/forgot-store.jsx');
var Router = require('react-router');
var Actions = require('../actions.jsx');
var Reflux = require('reflux');
var Login = require('./login.jsx');
var Formsy = require('formsy-react');
var Input = require('./input.jsx');
var Link = Router.Link

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ForgotStore,'onChange'),
		Router.History
	],

	getInitialState: function() {
    return {
    	response:[],
      u_email: '',
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
  handleSubmit: function(model) {
    //e.preventDefault();
    var u_email = model['user']['Email'].trim();

    if (!u_email) {
      return;
    }
    // TODO: send request to the server
		Actions.forgotPass(u_email);
    //this.setState({u_email: ''});
    
  },
  render: function(){
		return <section>
			{this.renderForgotPass()}
		</section>
	},
	renderForgotPass: function(){
		return (
        <div className="signin">
		      <div  className="panel panel-signin">
          	
            <div className="panel-body">
              <div className="logo text-center">
                  <img src="images/logo_big.png" alt="Chain Logo" />
              </div>
              <div className="mb30"></div>
              <Formsy.Form className="loginForm" id="forgotpass" onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
                  <div className="input-group">
                      <span className="input-group-addon un_txt"><i className="glyphicon glyphicon-user_custom"></i></span>
                      <Input type="text" className="form-control" name="user[Email]" value={this.state.u_email} placeholder="Email" validations="isEmail" validationError="Please enter valid email" required   />
                  </div>
                  <div className="clearfix">
                      <div className="login_btn">
                          <input type="submit" className="btn btn-orange btn-lg btn-full" value="Reset Password" disabled={!this.state.canSubmit} />
                      </div>
                  </div>                      
              </Formsy.Form>
            </div>
          </div>
        </div>  
		);
			
	},
	onChange: function(event, response){
		this.setState({response:response})
		/*Redirect code for this using Router.Navigation library in mixins */
		if(response.success){
      var state = { 'id': 1};
      this.history.pushState(null,null,state);
			//this.transitionTo('/',{ id: '1' });
		}else{
      toastr.error(response.error, {timeOut: 10000})
    }
		
	}
});