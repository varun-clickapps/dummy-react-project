var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link

module.exports = React.createClass({
  render: function(){
		return (
      <div>
        <div className='pageheader'>
          <div className='media'>
            <div className='media-body'>
              <div className='row'>
                <div className='col-xs-12'>
                  <h4 className='custom_breadcrumb'>Employee Records/ <span className='current_bread'>New Record</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      <ul className='time_att_tabs list-unstyled list-inline'>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'personal/'+this.props.personID}>Personal</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'organization/'+this.props.personID}>Organization</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'benefits-and-compensation/'+this.props.personID}>Compensation</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'employeefiles/'+this.props.personID}>Employee Files</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'notes/'+this.props.personID}>Notes</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'assets/'+this.props.personID}>Assets</Link></li>
        <li><Link activeClassName='active' onlyActiveOnIndex to={'offboarding/'+this.props.personID}>Offboarding</Link></li>
      </ul>
    </div>
		);
	}
});