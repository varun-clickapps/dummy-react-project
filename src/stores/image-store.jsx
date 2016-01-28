var Reflux = require('reflux');
var Api = require('../utils/api.jsx');
var Actions = require('../actions.jsx');

module.exports = Reflux.createStore({
	listenables: [Actions],
	getImages: function(topicId){
		Api.get('topics/'+topicId)
			.then(function(data){
				this.images = data.data;
				this.triggerChange();
			}.bind(this))
	},

	triggerChange: function(){
		this.trigger('chnage', this.images);
	}

});