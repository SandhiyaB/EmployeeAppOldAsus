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

class RemoveEmployee extends Component{

	constructor() {
        super()
        this.state = {

            employeeId: '',
            			
			valid:false,
			companyId:'',
			superiorId:'',
		}
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
	
  
  /*console.log(emp);
  */var employeeId;
  employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
	$.each(this.props.data, function (i, item) {
	
	  employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'
	  
	});
  $("#employeeId").append(employeeId);
  
  }
	RemoveBtn(){
		var self=this;
		/*alert(this.state.employeeId);
		*/var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

		this.state.companyId=companyId;
		this.state.superiorId=superiorId;
		this.setState({
			companyId:companyId,
			superiorId:superiorId,
		});
	  
		
			 /*alert(JSON.stringify(this.state));
			 */$.ajax({
					 	type: 'POST',
						data:JSON.stringify({

						employeeId: this.state.employeeId,
						 
						 companyId:this.state.companyId,
						 superiorId:this.state.superiorId,

						}),
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeedetails",
						contentType: "application/json",
						dataType: 'json',
						async:false,
						success: function(data,textStatus,jqXHR)
						{
						 /*console.log(data);

					 	alert(data);
					 	*/if(data.employeeName!=null){
					 			confirmAlert({
							      title: 'Delete Employee',                        // Title dialog
							      message: 'Are you sure want to remove '+data.employeeId +" " + data.employeeName+"  "+data.role+"  from department " + data.department ,               // Message dialog
							      confirmLabel: 'Confirm',                           // Text button confirm
							      cancelLabel: 'Cancel',                             // Text button cancel
							      onConfirm: () => {self.RemoveEmployee()},    // Action after Confirm
							      onCancel: () => {self.NoAction()},      // Action after Cancel
							    })
							}
							else{
								confirmAlert({
                            title: 'Invalid EmployeeId',                        // Title dialog
                            message: 'Enter Valid Employee Id',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })

							}	
						 },
						 error:function(data) {
						      /*  console.log('#####################error:################################'+data);*/
							  confirmAlert({
								title: 'Server Error',                        // Title dialog
								message: 'Server Error Try Again Later',               // Message dialog
								confirmLabel: 'Ok',                           // Text button confirm
														  
								
								 });                
									
						  },
			});
			
						

	}

RemoveEmployee(){

			/* alert(JSON.stringify(this.state));
			*/ var self=this;
			 $.ajax({
						type: 'POST',
						data:JSON.stringify({
							employeeId:this.state.employeeId,
						companyId:this.state.companyId,
						superiorId:this.state.superiorId,
						}),
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/deleteemployee",
						contentType: "application/json",
						dataType: 'json',
						async:false,
						success: function(data,textStatus,jqXHR)
						        {
									var employeeId=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
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
			  					*/localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(employeeId),"shinchanbaby"));
						  
									 
						        	confirmAlert({
		                            title: 'Removed ',                        // Title dialog
		                            message: 'successfully Removed  '+ data.employeeId,               // Message dialog
		                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })

						 			/*console.log(data);

									alert(data);
*/
											ReactDOM.render(
											<Router>
									  			<div>
									  
											 <Route path="/" component={EmployeeMenuHeader}/>
											 
											<Route path="/" component={Maintenance}/>
											
											
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
			   
NoAction(){
	ReactDOM.render(
		<Router>
		<div>
									  
			 <Route path="/" component={EmployeeMenuHeader}/>
											 
			<Route path="/" component={Maintenance}/>
											
											
		</div>
		</Router>,document.getElementById('root'));

}

render(){
		return(
			

			
	<div class="container" style={{marginBottom:"30%"}}>
	<div className="jumbotron">
	<h3>Remove Employee</h3>
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
 <button type="button" disabled={!this.state.valid} onClick={()=> this.RemoveBtn()}className="btn btn-primary" style={{ marginBottom:"0px", marginLeft:"auto",marginRight: "auto",marginTop: "0px",display:"block"}}>Remove</button>
</div>
	</div>
				
			
		);
	}

}


export default RemoveEmployee;
