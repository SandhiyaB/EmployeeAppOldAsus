import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import TaskMapping from './TaskMapping';




class Unlock extends Component{

	constructor() {
        super()
        this.state = {

            employeeId: '',
            			
			   valid:false,
			   companyId:'',
			            			};
			    }

	 handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value,
    				valid:true,
    			},
                 );
}

componentDidMount() {
	 var emp=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('LockList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
  /*console.log(emp);
  */var employeeId;
  employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
	$.each(emp, function (i, item) {
	
	  employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'
	  
	});
  $("#employeeId").append(employeeId);
  
  }

UnlockBtn(){


			 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
			 this.state.companyId=companyId;
			
			 this.setState({
			   companyId:companyId,
			 });
			
			 var self=this;
			 $.ajax({
						type: 'POST',
						data:JSON.stringify({

							employeeId:this.state.employeeId,
							companyId:this.state.companyId,
						
						}),
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/empunlock",
						contentType: "application/json",
						dataType: 'json',
						async:false,
						success: function(data,textStatus,jqXHR)
						        {
									/*console.log(data);

									alert(data);
							 		*/
									if(data.employeeName=="UNLOCKED")
									{
										var employeeId=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('LockList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
									/*console.log(employeeId);
									*/var del=self.state.employeeId;
									
									var key;
									var i=employeeId.length;
									/*console.log(i);
								   */
								  while(i--){
									if(del== employeeId[i].employeeId )
									  {
										key=i; 
										employeeId.splice(i,1);
									 } 
									  
								  }
								  
								 /* console.log(employeeId);
			  					*/localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(employeeId),"shinchanbaby"));
						  
										
						        	confirmAlert({
		                            title: data.employeeName,                        // Title dialog
		                            message: 'Successfully Unlocked  ' + data.employeeId,               // Message dialog
		                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                            		 })
									}
									else{
										confirmAlert({
											title: data.employeeName,                        // Title dialog
											message:  data.employeeId + '  is not Locked',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
															  
									
											 })
											
										
									}
						 			
											ReactDOM.render(
											<Router>
									  			<div>
									  
											 <Route path="/" component={EmployeeMenuHeader}/>
											 <Route path="/" component={TaskMapping}/>
											
											
											
											 </div>
											 </Router>,document.getElementById('root'));

						 			},
						error:function(data) {
						        /* console.log('#####################error:################################'+data);
						        */  confirmAlert({
									title: 'Server Error',                        // Title dialog
									message: 'Server Error Try Again Later',               // Message dialog
									confirmLabel: 'Ok',                           // Text button confirm
															  
									
									 });                
										
       
						},
				});

		}
			   

render(){
		return(
			

			
	<div class="container">
	<div className="jumbotron">
	<h3>Unlock Employee</h3>
	<div className="col-xs-12 col-sm-12 col-lg-12" style={{marginTop:"20px", marginBottom:"20px"}} >
	<label>
	   Employee Id* 
	   <select
  id="employeeId" 
  className="form-control"
  onChange={this.handleUserInput}
 
  name="employeeId" 
  style={{marginBottom:"15px"}}
  >
  </select>
  </label>
  
  
 			</div>
<button type="button" disabled={!this.state.valid} onClick={()=> this.UnlockBtn()}className="btn btn-primary" style={{marginLeft:"20px",marginBottom:"25px",marginLeft:"auto",marginRight: "auto",marginTop: "20px",display:"block"}}>UnLock</button>
</div>
	</div>
				
			
		);
	}

}


export default Unlock;;
