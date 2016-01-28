var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.dev.arbab.clicksandbox.com/api/v1/';
var apiKey = '33cd9357653df3d';

module.exports = window.api = {
	
	
	get: function(url,params){
		return fetch(rootUrl + url,{
				method: 'get'
		})
		
		.then(function(response){
			return response.json();
		})
		
	},

	post: function(url,params){
		return fetch(rootUrl + url,{
				method: 'post',
				headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
				body: JSON.stringify(params)
		})
		
		.then(function(response){
			return response.json() ;
		})

	},

	put: function(url,params){
		return fetch(rootUrl + url,{
				method: 'put',
				headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
				body: JSON.stringify(params)
		})
		
		.then(function(response){
			return response.json();
		})
	},

	delete: function(url){
		return fetch(rootUrl + url,{
				method: 'delete'
		})
		
		.then(function(response){
			return response.json();
		})
	}


};

// function checkStatus(response) {
	
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }
function parseJSON(response) {
	if(response.status == 401){
		response['error_status'] = response.status	
		return response
 	}else{
  	return response.json()
  }	
}