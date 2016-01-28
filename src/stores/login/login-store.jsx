var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	postLogin: function(u_name,u_pass){
		params = {login:u_name,password:u_pass}
		Api.post('sessions/',params)
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});