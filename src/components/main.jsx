var React = require('react');
//var Header = require('./header.jsx');
var Login = require('./login.jsx');
var TopicList = require('./topic-list.jsx');
module.exports = React.createClass({
	render: function(){
		return <div>
		
		{this.content()}
		</div>
	},

	content: function(){
		if(this.props.children){
			return this.props.children
		}else{
			return <Login />
			//return <TopicList />
		}

	}

}) 