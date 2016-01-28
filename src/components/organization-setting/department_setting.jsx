var React = require('react');
var Router = require('react-router');
var getDepStore = require('../../stores/organization_settings/get_dep_set.jsx');
var postDepSetting = require('../../stores/organization_settings/post_dep_set.jsx');
var delDepSetting = require('../../stores/organization_settings/del_dep_set.jsx');
var LeftMenu = require('../include/leftmenu.jsx');
var HeaderInner = require('../include/header.jsx');
var Footer = require('../include/footer.jsx');
var Actions = require('../../actions.jsx');
//FileInput = require('react-file-input');
var Reflux = require('reflux');
var Link = Router.Link
var DepListing = require('./list/dep_list.jsx');

var Formsy = require('formsy-react');
var Input = require('../input.jsx');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(getDepStore,'getOnChange'),
    Reflux.listenTo(postDepSetting,'postOnChange'),
    Reflux.listenTo(delDepSetting,'delOnChange'),
		Router.Navigation
	],

	getInitialState: function() {
    return {
      getResponse:[],
      postResponse:[],
      name: '',
      mail_alias:'',
      manager:'',
      depId:'',
      canSubmit: false
    };
  },
  componentWillMount: function(evt){
    Actions.getDepSetting();
  },
  handleNameChange: function(evt) {
    this.setState({
      name: evt.target.value
    });
  },
  handleMailChange: function(evt) {
    this.setState({
      mail_alias: evt.target.value
    });
  },
  handleManagerChange: function(evt) {
    this.setState({
      manager: evt.target.value
    });
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  handleSubmit: function(model) {
    //Fetch value from elements
    name = model.department['name'];
    mail_alias = model.department['mail_alias'];
    manager = model.department['manager'];
    
    depId = model.depId;//Id for department ('' for when we add and id when we edit record)

    if (!name) {
      return;
    }

    params = {'department':{'name':name,'mail_alias':mail_alias}}
   // TODO: send request to the server
   Actions.postDepSetting(params,depId);
  

  },
  render: function(){
		return (
				<div>
					<HeaderInner/>
					<div className='mainwrapper'> 	 
						<LeftMenu/>
						<div className='mainpanel'>
					    <div className='header_space'></div>
					    <div className='pageheader'>
					      <div className='media'>
					        <div className='media-body'>
					          <div className='row'>
					            <div className='col-xs-12'>
					              <h4 className='custom_breadcrumb'>Organization Settings/ <span>Company Settings</span></h4>
					            </div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <ul className='time_att_tabs list-unstyled list-inline'>
					      
                <li className='active'><Link to={'department'}>Departments</Link></li>
               
					    </ul>
						  <div className='contentpanel'>
		      			<div className='tab-content mb30'> 
									{this.renderLogin()}
								</div>
							</div>
							<Footer/>
						</div>
					</div>
			</div>	
		);
	},
	renderLogin: function(){
		//Getlisting of departments
    var listing  
    if(typeof this.state.getResponse.departments!='undefined'){
        listing =  <DepListing item={this.state.getResponse.departments} onDelEvent={this.delPopup}  onEditEvent={this.ShowEditPopup}/>
    }
		return (
        <div>
			    <div id='departments' className='tab-pane'>
          <div className='gridbox'>
            <h4 className='orange_title'> Departments12 </h4>
            <div className='row mb20'>
              <div className='col-xs-12 col-md-6 col-sm-6'>
                <h4>Departments</h4>
              </div>
              <div className='col-xs-12 col-md-6 col-sm-6'> <a className='btn btn-default btn-orange pull-right' href='' data-toggle='modal' data-target='#addDep' onClick={this.addDepFun}>+ Add</a> </div>
            </div>
            <Formsy.Form ref='form' className='compDepForm' id='compDepForm' encType='multipart/form-data' onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
              <div className='modal fade' id='addDep' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
                <div className='modal-dialog' role='document'>
                  <div className='modal-content padding15'>
                    <div className='modal-header modal-groupheader'>
                      <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>
                      <h4 className='modal-title' id='myModalLabel'>Departments</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='row hr_forms'>
                        <div className='col-xs-12 col-xx-12'>
                          <label className='form-title'>Department Name<span className='mandatory'>*</span></label>
                          <Input type='text' className='form-control' name='department[name]' placeholder='Department Name' value={this.state.name} validations='minLength:3,maxLength:40' validationError='Name must be between 3 to 40 characters' required/>
                           <Input type='hidden' name='depId' value={this.state.depId} />
                        </div>
                        <div className='clearfix'></div>
                        <br/>
                        <br/>
                        <div className='col-xs-12 col-xx-12'>
                          <label className='form-title'>Mail Alias</label>
                          <Input type='text' name='department[mail_alias]' className='form-control' validations='isEmail' validationError='This is not a valid email' placeholder='Mail Alias' value={this.state.mail_alias}/>
                        </div>
                        <div className='clearfix'></div>
                        <br/>
                        <br/>
                        <div className='col-xs-12 col-xx-12'>
                          <label className='form-title'>Manager</label>
                          <Input type='text' name='department[manager]' className='form-control' placeholder='Manager' value={this.state.manager} />
                        </div>
                        <div className='clearfix'></div>
                        <br/>
                        <br/>
                        <div className='col-xs-12 col-xx-12'>
                          <div className='form_btns'>
                            <input type='submit' value='Save' className='btn btn-orange' disabled={!this.state.canSubmit}/>
                            <input type='reset' value='Discard' className='btn btn-default mmarginR0' onClick={this.resetVariables}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             </Formsy.Form> 

            {listing}

          </div>
        </div>
      </div>  
        
		);	
	},

  addDepFun: function(){
   this.refs.form.reset(); 
   this.setState({
       name: '',
       mail_alias: '',
       manager: '',
       depId: ''
    })
  },

  resetVariables: function(){
    this.setState({
       name: '',
       mail_alias: '',
       manager: '',
       depId: ''
    })
  },

  ShowEditPopup: function(dep_id,event){
    Actions.getDepSetting(dep_id);
    $('label.error').remove();//Remove label validation error message 
  },
	
  delPopup: function(dep_id,event){
    if(confirm('Are you sure you want to delete?')){
      Actions.delDepSetting(dep_id);
    }else{
      return false;
    }  
  },
	getOnChange: function(event, response){

    
    
      if(response.success && response.edit == '0'){
        this.setState({getResponse:response})  
      }else{
        this.setState({
           name: response.department.name,
           mail_alias: response.department.mail_alias,
           manager: response.department.manager_id,
           depId: response.department.id 
        })
       $('#addDep').modal('show');
        
    }
   	
  },
   postOnChange: function(event, response){
    //Check session for authentication if expired the logout
   
      if(response.success){
        $('#addDep').modal('hide'); ///hide department popup model
        toastr.success(response.message, {timeOut: 5000, positionClass: 'toast-top-center'})
        Actions.getDepSetting();
        this.setState({name: '', mail_alias: '', manager: '', depId: ''});
      }else{
        toastr.error(response.error, {timeOut: 5000, positionClass: 'toast-top-center'})
      }
     
  },

  delOnChange: function(event, response){
    //Check session for authentication if expired the logout
   
      if(response.success){
        toastr.success(response.message, {timeOut: 5000, positionClass: 'toast-top-center'})
        Actions.getDepSetting();
      }else{
        toastr.error(response.error, {timeOut: 5000, positionClass: 'toast-top-center'})
      }
     
  }


});

