var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	forgotPass: function(u_email){
		params = {email:u_email}
		Api.post('passwords/',params)
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});