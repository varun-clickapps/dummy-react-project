var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	postDepSetting: function(params,depId){
		
		if(localStorage.getItem("accessToken") !== null){
			params['access_token'] = localStorage.getItem("accessToken");
		}else{
			params['access_token'] = ''
		}

		if (depId!=''){
			Api.put('departments/'+depId,params)
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
		}else{
			Api.post('departments/',params)		
			.then(function(data){
				this.response = data;
				this.triggerChange();
			}.bind(this))
		}	
		
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});