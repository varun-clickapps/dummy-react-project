
jQuery(document).ready(function($){


    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    // jQuery.validator.addMethod("Email", function(value, element) { //custom email validation
    // return this.optional( element ) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value );
    // }, 'Please enter a valid email address.');


    $.validator.addMethod("phonenumber", function(value, element) {
        return this.optional(element) || value == value.match(/^[0-9-+ ]+$/);
    }, "Phone Number should be valid");


    // $.validator.addMethod("minimum_len", function(value, element) {
    //     return value.length > 5;
    // }, "qaz");


    $.validator.addMethod("cus_url", function(value, element) { 
        if(value.substr(0,7) != 'http://'){
            value = 'http://' + value;
        }
        if(value.substr(value.length-1, 1) != '/'){
            value = value + '/';
        }
        return this.optional(element) || /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(value); 
    }, "Not valid url.");


    

    // $(document).on('submit','#loginForm',function(){
    //      /*Sign-In Validation */     
    //     var loginForm = $("#loginForm").validate({
    //         rules: {
    //             'user[email]': {
    //                 required: true,
    //                 email: true
    //             },
    //             'user[pass]': {
    //                 required: true,
    //                 minlength: 5
    //             }
    //         },
            
    //         // Specify the validation error messages
    //         messages: {
    //             'user[email]': {
    //                 required: "Email or EmpID  is required",
    //                 email: "Please enter valid email or empid"
    //             },
    //             'user[pass]': {
    //                 required: "Password is required",
    //                 minlength: "Password must be at least 5 characters"
    //             }   
                
    //         },
    //         submitHandler: function(form) {
                
    //         }    

    //     })
    //     loginForm.form()
    // });

   

    /*Forgot-password Validation */ 
    $(document).on('submit','#forgotpass',function(){     
        var forgotFrom = $("#forgotpass").validate({
            rules: {
                'user[email]': {
                    required: true,
                    email: true
                }
            },
            
            // Specify the validation error messages
            messages: {
                'user[email]': {
                    required: "Email is required",
                    email: "Please enter valid email"
                } 
                
            },
            submitHandler: function(form) {
                
            } 
          
        })
        forgotFrom.form()
    });    

    /*Change-Password Validation */ 
    $(document).on('submit','#changePassForm',function(){  

        var changPassForm = $("#changePassForm").validate({
            rules: {
                'user[password]': {
                    required: true,
                },
                'user[conf_pass]': {
                    required: true,
                    equalTo: "#user_password"
                }
            },
            
            // Specify the validation error messages
            messages: {
                'user[password]': {
                    required: "Password is required",
                    
                },
                'user[conf_pass]': {
                    required: "Confirm Password is required",
                    equalTo:"Password not matched"
                } 
            },
            submitHandler: function(form) {
                
            }    

        })
        
      changPassForm.form()  
    });    


    /*Company setting Validation */ 
    $(document).on('submit','#compSetForm',function(){     
       var compSet =  $("#compSetForm").validate({
            rules: {
                'name': {
                    required: true,
                    maxlength: 40,
                },
                'website': {
                    required: true,
                    cus_url: true
                },
                "admin_email": {
                    required: true,
                    email: true
                },

                'contact_number': {
                    required: true,
                    phonenumber: true,
                }
                ,
                'address1': {
                    required: true
                }
                ,
                'address2': {
                    required: true
                },

                'city': {
                    required: true
                },

                'country': {
                    required: true
                }

            },
            messages: {
                'name': {
                    required: "Name is required",
                    maxlength: "Name must not be more than 40 characters"
                },
                'website': {
                    required: "Website is required"
                },
                'admin_email': {
                    required: "Email is required",
                    email: "Email should be valid"
                },
                'contact_number': {
                    required: "Contact number is required",
                    phonenumber: "Contact number should be valid",
                },
                'address1': {
                    required: "First Address is required"
                },
                'address2': {
                    required: "Second Address is required"
                },
                'city': {
                    required: "City is required"
                },
                'country': {
                    required: "Country is required"
                }
                
            },
            submitHandler: function(form) {
                
            } 
        })
        compSet.form();
    });
    
     /*Company Location setting Validation */         

    $(document).on('click','#compLocForm',function(){
     var compLoc= $("#compLocForm").validate({
            rules: {
                'company[name]': {
                    required: true,
                    maxlength: 40,
                },
                'company[country]': {
                   required: true,
                }
                ,
                'company[city]': {
                    required: true
                }

            },
            
            // Specify the validation error messages
            messages: {
                'company[name]': {
                    required: "Name is required",
                    maxlength: "Name must not be more than 40 characters"
                },
              
                'company[country]': {
                    required: "Country is required"
                },

                'company[city]': {
                    required: "City is required"
                }
               
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                console.log(event+'--'+validator)
            },
            submitHandler: function(form) {
                
            } 
        })
        compLoc.form()
    });    

    /*Company Department setting Validation */  
    $(document).on('submit','#compDepForm',function(){   
       var compDep = $("#compDepForm").validate({
            rules: {
                'department[name]': {
                    required: true,
                    maxlength: 40,
                }

            },
            messages: {
                'department[name]': {
                    required: "Name is required",
                    maxlength: "Name must not be more than 40 characters"
                }
               
            },
            submitHandler: function(form) {
                
            } 
        })
     compDep.form()
    });      

        /*Company Jobtitle setting Validation */   
    $(document).on('submit','#jobSetForm',function(){       
        var compJob = $("#jobSetForm").validate({
            rules: {
                'job[name]': {
                    required: true,
                    maxlength: 40,
                }

            },
         
            messages: {
                'job[name]': {
                    required: "Job title is required",
                    maxlength: "Name must not be more than 40 characters"
                }
               
            },
            submitHandler: function(form) {
                //$(form).submit();
            } 
        })
    compJob.form()
    });     
       

    /*Company employee id Validation */   
    $(document).on('submit','#empIdSetForm',function(){     
        var empIdSet = $("#empIdSetForm").validate({
            rules: {
                'emp[seq_no]': {
                    required: true,
                },
                'emp[seq_prefix]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'emp[seq_no]': {
                    required: "Sequence number is required"
                },
                'emp[seq_prefix]': {
                    required: "Sequence prefix is required"
                }  
                
            },
            submitHandler: function(form) {
               
            } 
          
        })

        empIdSet.form()

    });    

    /*custom:- Asset Validation */   
    $(document).on('submit','#assetForm',function(){     
        var assetSet = $("#assetForm").validate({
            rules: {
                'asset[name]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'asset[name]': {
                    required: "Asset name is required"
                }
            },
            submitHandler: function(form) {
               
            } 
        })
        assetSet.form()
    });   

    /*custom:- Leave Validation */   
    $(document).on('submit','#leaveForm',function(){     
        var leaveSet = $("#leaveForm").validate({
            rules: {
                'leave[name]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'leave[name]': {
                    required: "Leave name is required"
                }
            },
            submitHandler: function(form) {
                
            } 
        })
        leaveSet.form()
    });    

    /*custom:- Loan Validation */   
    $(document).on('submit','#loanForm',function(){     
        var loanSet = $("#loanForm").validate({
            rules: {
                'loan[name]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'loan[name]': {
                    required: "Loan name is required"
                }
            },
            submitHandler: function(form) {
                
            } 
        })
        loanSet.form()
    });  

    /*custom:- Benifit Validation */   
    $(document).on('submit','#benifitForm',function(){     
        var benifitSet = $("#benifitForm").validate({
            rules: {
                'benifit[name]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'benifit[name]': {
                    required: "Benefit name is required"
                }
            },
            submitHandler: function(form) {
                
            } 
        })
        benifitSet.form()
    }); 

    /*custom:- Employment Validation */   
    $(document).on('submit','#employmentForm',function(){     
        var employmentSet = $("#employmentForm").validate({
            rules: {
                'employment[name]': {
                    required: true,
                }
            },
            
            // Specify the validation error messages
            messages: {
                'employment[name]': {
                    required: "Employment name is required"
                }
            },
            submitHandler: function(form) {
                
            } 
        })
        employmentSet.form()
    });    





});

//Foe delete confirmation message
function deleteItem() {
  if (!confirm("Are you sure you want to delete?")){
    return false;
  }else{
    return true;
  }
}

