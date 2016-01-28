var React = require('react');
var ReactRouter = require('react-router');
var hasHistory = require('history/lib/createHashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main.jsx');

var Forgotpass = require('./components/forgotpass.jsx');
var ChangePass = require('./components/changepass.jsx')
var department_set = require('./components/organization-setting/department_setting.jsx');


var history = hasHistory({
  queryKey: false
});


module.exports = (
	<Router history={history}>
		<Route path="/(/:name)" component={Main}>
			<Route path="forgotpass" component={Forgotpass} />
			<Route path="changepass(/:name)" component={ChangePass} />
			<Route path="department" component={department_set}/>
			
		</Route>
	</Router>
)