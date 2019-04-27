import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import CryptoJS from 'crypto-js' ;


import './EmployeeMenuPage.css';
import './App.css';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu'

import EditEmployeeDetails from './EditEmployeeDetails'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class Maintenance extends Component{

	constructor() {
        super()
        this.state = {

            employeeId: '',
			valid:false,
			companyId:'',


		    }
		}
	 handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
	this.setState({[name]: value,
		          valid:true,
	});
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

EditBtn(){
		var self=this;
		
		var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId=companyId;
	   
		this.setState({
		  companyId:companyId,
		});
			
			 $.ajax({
					 	type: 'POST',
						data:JSON.stringify({


				 employeeId:this.state.employeeId,
				 companyId:this.state.companyId,
			 }),
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/updateEmployeeDetails",
						contentType: "application/json",
						dataType: 'json',
						async:false,
						success: function(data,textStatus,jqXHR)
						{

						if(data.firstName){
/*
						 console.log(data);
						

					 	alert(data);
*/					 	ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                          <Route path="/" component={EmployeeAddRemUpdMenu}/>
                                    
                          <Route path="/" component={() => <EditEmployeeDetails data={data} />}/>

                                                              
                            </div>
                          </Router>, document.getElementById('root'));
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
						       /* console.log('#####################error:################################'+data);
						       */ confirmAlert({
								title: 'Server Error',                        // Title dialog
								message: 'Server Error Try Again Later',               // Message dialog
								confirmLabel: 'Ok',                           // Text button confirm
														  
								
								 });                
									
       
						  },
			});
			
						

	}


render(){
		return(
			

			
	<div class="container"  style={{marginBottom:"30%"}}>
	
  
  	<div className="jumbotron">
	<h3>Update Employee</h3>
	
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
 
<button type="button" disabled={!this.state.valid}  onClick={()=> this.EditBtn()}className="btn btn-primary" style={{marginLeft:"20px",marginLeft:"auto",marginRight: "auto",marginTop: "20px",display:"block"}}>Edit</button>
</div>
  
</div>
	
				
			
		);
	}

}


export default Maintenance;
