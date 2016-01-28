var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	changePass: function(u_pass,u_confirm_pass,changePassToken){
		params = {user:{password:u_pass, password_confirmation:u_confirm_pass}}
		Api.put('passwords/'+changePassToken,params)
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});