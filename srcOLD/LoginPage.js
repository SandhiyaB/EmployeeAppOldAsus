import React,{Component} from 'react';
import ReactDOM from 'react-dom';


import './LoginPage.css';
import { FormErrors } from './FormErrors';

import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';

import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';

import $ from 'jquery';
import CryptoJS from 'crypto-js' ;
import ReportMenuPage from './ReportMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ForgotPassword from './ForgotPassword';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';

class LoginPage extends Component{

	constructor() {
        super()
        this.state = {

            emailId: '',
            password: '',
            date:'',
			formErrors: {emailId: '', password: ''},
			                     emailIdValid: false,
			                     passwordValid: false
			        };
			    }

				handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  () => { this.validateField(name, value) });
			}
			


login(){
		 /*alert(" Login page");
		 */var today = new Date();
          today= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
          this.state.date=today;
     
		 this.setState({
      emailId: this.state.emailId,
      password: this.state.password,
      mobileNo:this.state.mobileNo,
      date:today,
    });
     var key="shinchanbaby";

    localStorage.setItem('EmailId',  CryptoJS.AES.encrypt(this.state.emailId,key));
    localStorage.setItem('Password',  CryptoJS.AES.encrypt(this.state.password,key));
    
    /*alert(this.state.emailId);
    alert(this.state.password);
    alert(JSON.stringify(this.state));
    */var self = this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          emailId: this.state.emailId,
          password: this.state.password,
          
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeLogin",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        crossDomain:true,

        success: function(data, textStatus, jqXHR)

        {
          /*console.log(data);
          alert(data);
		 000 */
          console.log(data);
		 
		 if (data.employeeId == "NOT_REGISTERED") {
						confirmAlert({
							title: 'Register',                        // Title dialog
							message: 'Please Register',               // Message dialog
							confirmLabel: 'Ok',                           // Text button confirm
																				
							
							 })
							 ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 
				 

          } else if (data.employeeId == "PASSWORD_INCORRECT") {
						confirmAlert({
							title: 'INCORRECT',                        // Title dialog
							message: 'Please enter correct Password',               // Message dialog
							confirmLabel: 'Ok',                           // Text button confirm
						})
						ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 
				 

          } else if (data.employeeId == "LOCKED"){
						
						/*alert("LOCKED");
						*/confirmAlert({
							title: 'LOCKED',                        // Title dialog
							message: 'Your ID has been Locked',               // Message dialog
							confirmLabel: 'Ok',                           // Text button confirm
						})
						ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 
  }else if (data.employeeId == "BLOCKED"){
						
		/*alert("BLOCKED");
		*/confirmAlert({
			title: 'BLOCKED',                        // Title dialog
			message: 'Your ID has been Blocked. Please Contact Administration',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm
		})
		ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 
 }else {
			 var key="shinchanbaby";
			 console.log("data",data);
            localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(),key));
           console.log("kkkk",data.employeeDepartmentlist);
            localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(data.employeeDepartmentlist),key));
            localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist),key));
            localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist),key));
            localStorage.setItem('Role', CryptoJS.AES.encrypt(data.role,key));
            localStorage.setItem('EmployeeId', CryptoJS.AES.encrypt(data.employeeId,key));
           // localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList),key));
			localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(data.lockList),key));
			localStorage.setItem('ReportingManagerList', CryptoJS.AES.encrypt(JSON.stringify(data.reportingManagerList),key));
			
			localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId,key));
			localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName,key));
			localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName,key));

			localStorage.setItem('Department', CryptoJS.AES.encrypt(data.Department,key));

			
			{/*localStorage.setItem('isLoggedIn',"true");
            
            localStorage.setItem('Departments',JSON.stringify(data.employeeDepartmentlist));
            localStorage.setItem('Roles', JSON.stringify(data.employeeRolelist));
            localStorage.setItem('Permissions',JSON.stringify(data.employeePermisionlist));
            localStorage.setItem('Role', data.role);
            localStorage.setItem('EmployeeId',data.employeeId);
            localStorage.setItem('EmpList', JSON.stringify(data.employeeList));
					 */}
            

             ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route exact path="/" component={EmployeeMenuPage}/>
					 <Route exact path="/Attendence" component={Attendence}/>
					 <Route exact path="/Charts" component={Charts}/>
					<Route exact path="/AttendanceDisplay" component={AttendanceDisplay}/>
					
					<Route exact path="/Maintenance" component={Maintenance}/>
					 <Route exact path="/AddEmployee" component={AddEmployee}/>
					 <Route exact path="/RemoveEmployee" component={RemoveEmployee}/>
					 <Route exact path="/SearchEmployee" component={SearchEmployee}/>
					 <Route exact path="/UpdateEmployee" component={UpdateEmployee}/>
					 <Route exact path="/EmployeeAttendanceRequest*" component={EmployeeAttendanceRequest}/>
					 <Route exact path="/EmployeeLeaveRequest*" component={EmployeeLeaveRequest}/>

					 
					 </div>
					 </Router>,document.getElementById('root'));
					registerServiceWorker();
				}




          },


          error: function(data) {
           /* console.log('#####################error:################################' + data);
           */ confirmAlert({
			title: 'Server Error',                        // Title dialog
			message: 'Server Error Try Again Later',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm
									  
			
			 });                
								
					
          },
        });

		alert("alert");
    }
	 



			     validateField(fieldName, value) {
			    let fieldValidationErrors = this.state.formErrors;
			    let emailIdValid = this.state.emailIdValid;
			    let passwordValid = this.state.passwordValid;

			    switch(fieldName) {

			      case 'emailId':
			        emailIdValid =value.length >= 10;
			     { /*  emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);*/}
			        fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
			        break;
			      case 'password':
			        passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
			        fieldValidationErrors.password = passwordValid ? '': ' is too short';
			        break;
			      default:
			        break;
			    }
			    this.setState({formErrors: fieldValidationErrors,
			                    emailIdValid: emailIdValid,
			                    passwordValid: passwordValid
								}, this.validateForm);
			  }

			  validateForm() {
			    this.setState({formValid: this.state.emailIdValid && this.state.passwordValid});
			}

			errorClass(error) {
			    return(error.length === 0 ? '' : 'has-error');
			}
Fpassword() {
      ReactDOM.render( < ForgotPassword / > , document.getElementById('root'));
      
    }
    

render(){
		return(

			<div className="loginpage" id="loginpagebg">
				<div className="login-container">
				<div className="container" id="logbg" >
				<div className="containerlogin" id="loginpage">

					<div className="form-signin-heading text-muted">
					<h2>LogIn</h2>
					</div>

					
					  <form className="form-signin">
						

						  <input type="text" value={this.state.emailId} onChange={this.handleUserInput}
 								name="emailId" id="emailId"  className="form-control"  required="" autoFocus="" placeholder="Enter email" />

						

					
					

						 <input type="password" value={this.state.password} onChange={this.handleUserInput} 	name="password" id="password" className="form-control" required="" placeholder="Enter password" />
						


						<div className="checkbox">
						  <button type="button"  onClick={()=> this.Fpassword()}  className="btn btn-link">Forgot Password ?</button>
						</div>

						<button type="submit" disabled={!this.state.formValid} onClick={()=> this.login()} className="btn btn-lg btn-primary btn-block" >Submit</button>
					  </form>
					</div>
					</div>
				</div>
			</div>

		);
	}

}


export default LoginPage;

