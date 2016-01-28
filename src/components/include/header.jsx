var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions.jsx');
var LogoutStore = require('../../stores/login/logout-store.jsx');
var Reflux = require('reflux');
var Link = Router.Link

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(LogoutStore,'OnChange'),
    Router.History
  ],
  getInitialState: function() {
    return {
      response:[]
    };
  },
  logoutClicked: function(){
    Actions.logout();
  },
  render: function(){
		return <section>
			{this.renderForgotPass()}
		</section>
	},

	renderForgotPass: function(){
		return (
      <header>
        <div className="headerwrapper">
        <div className="header-left"> <a className="logo" href="dashboard-hr.php"> <img alt="" src="../../images/logo.png"/> </a>
          <div className="pull-right"> <a className="menu-collapse" href="javascript:void(0);"> <i className="fa fa-bars"></i> </a> </div>
        </div>
    
    
        <div className="header-right">
          <div className="pull-right">
            <div className="borderder_pan pull-left">
              <div className="btn-group btn-group-list btn-group-notification">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button"> <i className="fa ico-bell"></i> <span className="badge">5</span> </button>
                <div className="dropdown-menu pull-right"> <a className="link-right" href="javascript:void(0);"><i className="fa fa-search"></i></a>
                  <h5>Notification</h5>
                  <ul className="media-list dropdown-list">
                    <li className="media"> <img alt="" src="images/chris_palmer_profile_11.jpg" className="img-circle pull-left noti-thumb"/>
                      <div className="media-body"> <strong>Nusja Nawancali</strong> likes a photo of you <small className="date"><i className="fa fa-thumbs-up"></i> 15 minutes ago</small> </div>
                    </li>
                    <li className="media"> <img alt="" src="images/chris_palmer_profile_11.jpg" className="img-circle pull-left noti-thumb"/>
                      <div className="media-body"> <strong>Weno Carasbong</strong> shared a photo of you in your <strong>Mobile Uploads</strong> album. <small className="date"><i className="fa fa-calendar"></i> July 04, 2014</small> </div>
                    </li>
                    <li className="media"> <img alt="" src="images/chris_palmer_profile_11.jpg" className="img-circle pull-left noti-thumb"/>
                      <div className="media-body"> <strong>Venro Leonga</strong> likes a photo of you <small className="date"><i className="fa fa-thumbs-up"></i> July 03, 2014</small> </div>
                    </li>
                    <li className="media"> <img alt="" src="images/chris_palmer_profile_11.jpg" className="img-circle pull-left noti-thumb"/>
                      <div className="media-body"> <strong>Nanterey Reslaba</strong> shared a photo of you in your <strong>Mobile Uploads</strong> album. <small className="date"><i className="fa fa-calendar"></i> July 03, 2014</small> </div>
                    </li>
                    <li className="media"> <img alt="" src="images/chris_palmer_profile_11.jpg" className="img-circle pull-left noti-thumb"/>
                      <div className="media-body"> <strong>Nusja Nawancali</strong> shared a photo of you in your <strong>Mobile Uploads</strong> album. <small className="date"><i className="fa fa-calendar"></i> July 02, 2014</small> </div>
                    </li>
                  </ul>
                  <div className="dropdown-footer text-center"> <a className="link" href="javascript:void(0);">See All Notifications</a> </div>
                </div>
              </div>
            </div>
            <div className="btn-group btn-group-option profile_btn">
              <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button"><span className="profile_picture pull-left"><img src="images/emp-12.png" className="centric"/></span> <i className="fa fa-caret-down"></i> </button>
              <ul role="menu" className="dropdown-menu pull-right">
                <li><span><i className="glyphicon glyphicon-user"></i> My Profile</span></li>
                <li><span><i className="glyphicon glyphicon-star"></i> Activity Log</span></li>
                <li><span><i className="glyphicon glyphicon-cog"></i> Account Settings</span></li>
                <li><span><i className="glyphicon glyphicon-question-sign"></i> Help</span></li>
                <li className="divider"></li>
                <li><span onClick={this.logoutClicked}><i className="glyphicon glyphicon-log-out"></i>signout</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
		);
	},
  OnChange: function(event, response){
    if(response.success){
      localStorage.removeItem('accessToken');
      this.history.pushState(null,'/');
    }
   // this.setState({response:response})
  }

});