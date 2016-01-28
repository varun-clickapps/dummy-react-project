var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link
var Actions = require('../../actions.jsx');

var getDepStore = require('../../stores/organization_settings/get_dep_set.jsx');
module.exports = React.createClass({
  mixins:[
      Reflux.listenTo(getDepStore,'getDepChange')
  ],
  getInitialState:function(){
    return{
        getDepList:[]
    }    
  },
  componentWillMount:function(){
    Actions.getDepSetting();
  },
  render: function(){

		return (
      <div className="pageheader">
        <div className="media">
          <div className="media-body">
            <div className="row mb20">
              <div className="col-xs-6">
                <h4 className="custom_breadcrumb"><span>Employees/</span> <span className='current_bread'>Employees List</span></h4>
              </div>
              <div className="col-xs-6"> <Link className="btn btn-default btn-orange pull-right" title="add employee" to={'personal'}>+ Add Employee</Link> </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-3 col-sm-12">
                <input type="text" className="form-control searchinput" placeholder="Search by ID, name and job title"/>
              </div>
              <div className="col-xs-12 col-md-9 col-sm-12">
                <ul className="list-inline bs-glyphicons-list pull-right">
                  <li><a href="employees-listing-tiles.php"> <span className="glyphicon glyphicon-th-large listing-icon" aria-hidden="true"></span> </a></li>
                  <li><a href="javascript:void(0);"> <span className="glyphicon glyphicon-align-justify grid-active" aria-hidden="true"></span> </a></li>
                </ul>
                <nav className="navbar navbar-default topnav pull-right"> 
                  
                  
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
                  </div>
                  
                  
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Status <span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                          <li><a href="#">Active</a></li>
                          <li><a href="#">Inactive</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Nationality <span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                          <li><a href="#">Dropdown1</a></li>
                          <li><a href="#">Dropdown1</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Department <span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                            {this.getDeplisting()} 
                        </ul>
                      </li>
                      <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Shift Details <span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                          <li><a href="#">Dropdown1</a></li>
                          <li><a href="#">Dropdown1</a></li>
                        </ul>
                      </li>
                       
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	},
  getDepChange:function(event,response){
    this.setState({getDepList:response.departments});
  },
  getDeplisting:function(){
     if(typeof this.state.getDepList != undefined){
          return  this.state.getDepList.map(function(data){
           return <li key={data.id} id={data.id}><span>{data.name}</span></li>
        });
     }
  }
  
});