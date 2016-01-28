var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link
module.exports = React.createClass({
  render: function(){
		return <footer>
			{this.renderForgotPass()}
		</footer>
	},
	renderForgotPass: function(){
		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <div className="footer_links">
              <div className="links pull-left"><a href="#">Privacy Policy</a><a href="#" className="last-child">Terms of use</a></div>
              <div className="pull-right powered_by"><span>Powered by:</span>Click Apps</div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
		);
	}
});