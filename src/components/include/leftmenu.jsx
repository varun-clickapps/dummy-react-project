var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link
module.exports = React.createClass({
  render: function(){
		return <section>
			{this.renderForgotPass()}
		</section>
	},
	renderForgotPass: function(){
		return (
      <div className="leftpanel">
        <h5 className="leftpanel-title">MAIN</h5>
        <ul className="nav nav-pills nav-stacked">
          <li className="main">Main</li>
          <li className="parent"><a href="javascript:void(0);"><i className="fa setting-icon"></i> <span>Settings</span></a>
            <ul className="children">
              <li className="firstnav">System Settings</li>
              <li><Link to={'company'}>Organization Settings</Link></li>
              <li><Link to={'organization-charts'}>Organization Charts</Link></li>
              <li><Link to={'users-and-permissions'}>Users and Permissions</Link></li>
            </ul>
            <ul className="children">
              <li className="firstnav">Module Configuration</li>
              <li><Link to={'dashboard'}>Dashboard</Link></li>
              <li><Link to={'time-and-attendance'}>Time and Attendance</Link></li>
              <li><Link to={'benefits'}>Benefits </Link></li>
              <li><Link to={'reports'}>Reports</Link></li>
              <li><Link to={'employee-self-service'}>Workflow Manager</Link></li>
             </ul>
          </li>
          <li><Link to={'dashboard'}><i className="fa dashboard-icon"></i> <span>Dashboard</span></Link></li>
          <li><Link to={'employee_list'}><i className="fa employees-icon"></i> <span>Employees</span></Link></li>
          <li><Link to={'employee-self-service'}><i className="fa employeesself-icon"></i> <span>Employee Self Service</span></Link></li>
          <li><Link to={'time-and-attendance'}><i className="fa time-icon"></i> <span>Time and Attendance</span></Link></li>
          <li><Link to={'government-relation'}><i className="fa government-icon"></i> <span>Government Relation</span></Link></li>
          <li><Link to={'payroll'}><i className="fa payroll-icon"></i> <span>Payroll</span></Link></li>
          <li><Link to={'reports'}><i className="fa report-icon"></i> <span>Reports</span></Link></li>
        </ul>
      </div>
		);
			
	}
});