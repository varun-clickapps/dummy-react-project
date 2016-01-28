var React = require('react');
var Router = require('react-router');
var Actions = require('../../../actions.jsx');
var Reflux = require('reflux');

module.exports = React.createClass({
	mixins: [
		//Reflux.listenTo(LoginStore,'onChange'),
		Router.History		
	],

  render: function(){
		return (
			<div>
				{this.renderLogin()}
			</div>	
		);
	},
	renderLogin: function(){
		
		return (
        <div className="table-responsive">
          <table className="table mb30 vmiddle">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Mail ALias</th>
                <th>Manager</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
             {this.props.item.map(function(data){
                return(
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.mail_alias}</td>
                    <td>{data.manager_id}</td>
                    <td className="table-action">
                      <span onClick={this.props.onDelEvent.bind(null,data.id)} data-original-title="Delete" data-toggle="Delete" data-original-title="Delete"  className="delete-row tooltips pull-right"><i className="fa close-icon"></i></span>
                      <span onClick={this.props.onEditEvent.bind(null,data.id)}  data-toggle="tooltip" title="" className="tooltips pull-right" data-original-title="Edit" ><i  className="fa edit-icon"></i></span>
                    </td>
                  </tr>    
                );
             }.bind(this))}
              
            </tbody>
          </table>
        </div>
        
		);	
	},
	
	onChange: function(event, response){
		this.setState({response:response})
	}
});