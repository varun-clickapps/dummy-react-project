var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	delDepSetting: function(depId){

		if(localStorage.getItem("accessToken") !== null){
			params = localStorage.getItem("accessToken");
		}else{
			params = ''
		}
		
		

		Api.delete('departments/'+depId+'?access_token='+params)
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});