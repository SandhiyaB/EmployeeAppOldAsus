import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';

class AddEmployee extends Component {

    constructor() {
        super()
        this.state = {

            firstName: '',
            lastName: '',
            proofType: '',
            proofNo: '',
            dob: '',
            emailId: '',
            mobileNo: '',
            address: '',
            employeeType: '',
            role: '',
            department: '',
            companyId: '',
            reportingManagerId:'',
            reportingManagerRole:'',

            formErrors: {
                firstName: '',
                lastName: '',
                proofType: '',
                proofNo: '',
                dob: '',
                emailId: '',
                mobileNo: '',
                address: '',
                employeeType: '',
                role: '',
                department: '',

            },

            firstNameValid: false,
            lastName: false,
            proofType: false,
            proofNo: false,
            dob: false,
            emailId: false,
            mobileNo: false,
            address: false,
            employeeType: false,
            role: false,
            department: false,
        };

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
   


    handleReportingManager = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ reportingManagerId: value },
            () => { this.validateField(name, value) });


         this.state.reportingManagerId = value;
         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        /*alert(JSON.stringify(this.state);*/
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId:this.state.reportingManagerId,
                companyId: this.state.companyId,
            }),
            url: "http://localhost:8080/EmployeeAttendenceAPI/employee/ReportingManagerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    self.state.reportingManagerName=data.employeeName;
                    self.state.reportingManagerRole=data.role;
                    
            },
            error: function (data) {
						             /*console.log('#####################error:################################'+data);
						             */ confirmAlert({
                                        title: 'Server Error',                        // Title dialog
                                        message: 'Server Error Try Again Later',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                                                  
                                        
                                         });                
                                                                     // Text button confirm


            

            },
        });
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let proofNoValid = this.state.proofNoValid;
        let emailIdValid = this.state.emailIdValid;
        let mobileNoValid = this.state.mobileNoValid;
        let addressValid = this.state.addressValid;
        /*  let employeeTypeValid = this.state.employeeTypeValid;
            let roleValid = this.state.roleValid;
            let departmentValid = this.state.departmentValid;
            let proofTypeValid = this.state.proofTypeValid;
            let dobValid = this.state.dobValid; */

        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.firstName = firstNameValid ? '' : ' is InCorrect';
                break;
            case 'lastName':
                lastNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.lastName = lastNameValid ? '' : ' is InCorrect';
                break;
            case 'proofNo':
                proofNoValid = value.length >= 5;
                fieldValidationErrors.proofNo = proofNoValid ? '' : ' is InValid';
                break;

            case 'emailId':
                emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.emailId = emailIdValid ? '' : ' is InCorrect';
                break;
            case 'mobileNo':
                mobileNoValid = value.length <= 10;
                fieldValidationErrors.mobileNo = mobileNoValid ? '' : ' is InCorrect';
                break;

            case 'address':
                addressValid = value.length >= 5;
                fieldValidationErrors.address = addressValid ? '' : ' is too short';
                break;
            /*  case 'dob':
                    dobValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                    fieldValidationErrors.dob = dobValid ? '' : ' is invalid';
                    break;
    
                case 'role':
                    passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
                    fieldValidationErrors.role = passwordValid ? '' : ' is too short';
                    break;
                    case 'department':
                    passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
                    fieldValidationErrors.department = passwordValid ? '' : ' is too short';
                    break; */

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            proofNoValid: proofNoValid,
            emailIdValid: emailIdValid,
            mobileNoValid: mobileNoValid,
            addressValid: addressValid

        }, this.validateForm);
    }

    validateForm() {

        this.setState({
            formValid:
                this.state.proofType
                && this.state.employeeType
                && this.state.firstName
                && this.state.role
                && this.state.department
                && this.state.lastNameValid
                && this.state.proofNoValid
                && this.state.emailIdValid
                && this.state.mobileNoValid
                && this.state.addressValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


    AddEmployeeFunc() {

        /*alert(this.state.firstName);*/

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        /*alert(JSON.stringify(this.state);*/
       alert(JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        proofType: this.state.proofType,
        proofNo: this.state.proofNo,
        dob: this.state.dob,
        emailId: this.state.emailId,
        mobileNo: this.state.mobileNo,
        address: this.state.address,
        employeeType: this.state.employeeType,
        role: this.state.role,
        department: this.state.department,
        companyId: this.state.companyId,
        reportingManagerId:this.state.reportingManagerId,
        reportingManagerRole:this.state.reportingManagerRole,
    }));
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                proofType: this.state.proofType,
                proofNo: this.state.proofNo,
                dob: this.state.dob,
                emailId: this.state.emailId,
                mobileNo: this.state.mobileNo,
                address: this.state.address,
                employeeType: this.state.employeeType,
                role: this.state.role,
                department: this.state.department,
                companyId: this.state.companyId,
                reportingManagerId:this.state.reportingManagerId,
                reportingManagerRole:this.state.reportingManagerRole,
            }),
            url: "http://localhost:8080/EmployeeAttendenceAPI/employee/addemployee",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
												/*console.log(data);
                        */if (data.employeeId == "EMAIL") {
                    confirmAlert({
                        title: 'Cant Add Employee',                        // Title dialog
                        message: data.emailId + ' Already Exits',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })

                } else if (data.employeeId == "MOBILE") {
                    confirmAlert({
                        title: 'Cant Add Employee',                        // Title dialog
                        message: data.mobileNo + ' Already Exits',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })



                } else {

                    var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                    emp.push({ employeeId: data.employeeId });
												/*console.log(emp);
												console.log(emp);
                        localStorage.setItem('EmpList', JSON.stringify(emp));
             
												*/localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(emp), "shinchanbaby"));



                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Successfully Added Employee And Your Employee Id is ' + data.employeeId,               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    });
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={EmployeeMenuHeader} />

                                <Route path="/" component={Maintenance} />

                            </div>
                        </Router>, document.getElementById('root'));
                }

            },
            error: function (data) {
						             /*console.log('#####################error:################################'+data);
						             */ confirmAlert({
                                        title: 'Server Error',                        // Title dialog
                                        message: 'Server Error Try Again Later',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                                                  
                                        
                                         });                
                                                                      // Text button confirm


                
            },
        });
    }

    componentDidMount() {
        /*for drop down
       alert('componentDidMount');
      */
        var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
/*console.log(department);
*/var dept;
        dept += '<option value="" disabled selected hidden>Select a department</option>';
        $.each(department, function (i, item) {

            dept += '<option value="' + item.department + '">' + item.department + '</option>'

        });
        $("#department").append(dept);

        var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
/*console.log(Role);
*/var role;
        role += '<option value="" disabled selected hidden >Select a role</option>';
        $.each(Role, function (i, item) {

            role += '<option value="' + item.role + '">' + item.role + '</option>'

        });
        $("#role").append(role);
        	
  var emp=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ReportingManagerList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
  /*console.log(emp);
  */
 var employeeId='';
  console.log("report",emp);


  
  employeeId += '<option value="" disabled selected hidden >Select a Employee Id</option>';
	$.each(emp, function (i, item) {
	
	  employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'
	  console.log(employeeId);
	});
  $("#reportingManagerId").append(employeeId);

    }


    render() {
        return (



            <div class="container" style={{ marginBottom: "30%" }}>

                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <form >

                    <label for="firstName">
                        First Name*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
                        <input type="text"
                            onChange={this.handleUserInput}
                            id="firstName"
                            name="firstName"
                            placeholder="Your name.."
                            required />
                    </div>

                    <label for="lastName">
                        Last Name*
		    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>

                        <input type="text"
                            onChange={this.handleUserInput}
                            id="lastName"
                            name="lastName"
                            placeholder="Your last name.."
                            required />
                    </div>

                    <label for="proofType">
                        Employee Proof*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.proofType)}`}>
                        <select name="proofType"
                            id="proofType"
                            onChange={this.handleUserInput}
                            required>
                            <option value="" disabled selected hidden>Select your particular proof</option>
                            <option value="VoterID">VoterID</option>
                            <option value="License">LicenceNo</option>
                            <option value="PanCard">PancardNo</option>
                            <option value="Aadhar">AadharNo</option>
                            <option value="Passport">PassportNo</option>
                            <option value="RationCard">RationCardNo</option>
                        </select>
                        <input type="text"
                            onChange={this.handleUserInput}
                            id="proofNo"
                            name="proofNo"
                            placeholder="Your Proof No.."
                            required />


                    </div>

                    <label for="dob">
                        DOB*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.dob)}`}>
                        <input type="date"
                            onChange={this.handleUserInput}
                            id="dob"
                            name="dob"
                            placeholder="Your DOB.."
                            required />
                        <br />

                    </div>

                    <label for="emailId">
                        Email ID*
    		</label><div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}>

                        <input type="email"
                            onChange={this.handleUserInput}
                            id="emailId"
                            name="emailId"
                            maxlength="50"
                            placeholder="Your EmailID.." required />

                    </div>

                    <label for="mobileNo">
                        Mobile No*
    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.mobileNo)}`}>

                        <input type="number"
                            onChange={this.handleUserInput}
                            id="mobileNo"
                            name="mobileNo"
                            maxlength="10"

                            placeholder="Your Mobile No.."
                            required />
                    </div>
                    <label for="address">
                        Address*
    		</label>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                        <textarea id="address"
                            onChange={this.handleUserInput}
                            name="address"
                            maxlength="250"
                            placeholder="Your address.." required style={{ height: '200px' }}> </textarea>
                    </div>
                    <label for="employeeType">
                        Employee Type*
    		</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.employeeType)}`}>
                        <select name="employeeType"
                            id="employeeType"
                            onChange={this.handleUserInput}
                            required>
                            <option value="" disabled selected hidden>Select your Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <label for="role">
                        Role*
   			</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.role)}`}>
                        <select
                            name="role"
                            id="role"
                            onChange={this.handleUserInput}
                            required>
                        </select>
                    </div>

                    <label for="department">
                        Department*
   			</label>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.department)}`}>
                        <select
                            name="department"
                            id="department"
                            onChange={this.handleUserInput}
                            required>

                        </select>
                        </div>
            <label for="department">
                        Reporting Manager ID*
   			</label>
                    <div >
                           
                        
                        <select
                            name="reportingManagerId"
                            id="reportingManagerId"
                            onChange={this.handleReportingManager}
                            required>

                        </select> 
                        <input type="text"
                            value={this.state.reportingManagerName}
                            id="reportingManagerName"
                            name="reportingManagerName"
                            maxlength="50"
                            readOnly
                            placeholder=" Reporing Manager Name.." required />
                       
                        <input type="text"
                            value={this.state.reportingManagerRole}
                            id="reportingManagerRole"
                            name="reportingManagerRole"
                            maxlength="50"
                            readOnly
                            placeholder=" Reporting Manager Role.." required />
                        
                        </div>
                    <button type="button" disabled={!this.state.formValid} onClick={() => this.AddEmployeeFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Add</button>
                </form>
            </div>







        );
    }

}


export default AddEmployee;
