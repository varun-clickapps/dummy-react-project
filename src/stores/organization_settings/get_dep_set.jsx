var Reflux = require('reflux');
var Api = require('../../utils/api.jsx');
var Actions = require('../../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	getDepSetting: function(locId){
		
		if(localStorage.getItem("accessToken") !== null){
			params = localStorage.getItem("accessToken");
		}else{
			params = ''
		}
		//Its for to check if we are showing a listing or sepcefic records
		loc_id = (typeof locId !='undefined') ? locId : ''

		Api.get('departments/'+loc_id+'?access_token='+params)
			.then(function(data){
				this.response = data;
				this.response['edit'] = (typeof locId !='undefined') ? 1 : 0				
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.response);
	}

});