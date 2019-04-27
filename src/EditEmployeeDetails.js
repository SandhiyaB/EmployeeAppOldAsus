import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
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


class EditEmployeeDetails extends Component{

  constructor(props) {
        super(props)
        this.state = {

            firstName: '',
            lastName: '',
            proofType: '',
            proofNo:'',
            dob: '',
            emailId: '',
            mobileNo: '',
            address: '',
            employeeType: '',
            role: '',
            department: '',
            employeeId:'',
            companyId:'',
            reportingManagerId:'',
            reportingManagerName:'',
            reportingManagerRole:'',
                                };
          }

          

        handleUserInput = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          this.setState({[name]: value},
                        () => { this.validateField(name, value) });
      }


           validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let emailIdValid = this.state.emailIdValid;
          let passwordValid = this.state.passwordValid;

          switch(fieldName) {

            case 'emailId1':
              emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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
      }d


SaveBtn(){
    
    /*alert(this.state.firstName);
    */var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId=companyId;
		this.setState({
			companyId:companyId,
    });
    
             /*alert(JSON.stringify(this.state));
             */$.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/updateemployee",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                       /*console.log(data);
                       */confirmAlert({
                            title: 'Saved',                        // Title dialog
                            message: 'Suceessfully updated '+data.employeeId,               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                        ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                                         
                          <Route path="/" component={Maintenance}/>
                                                              
                            </div>
                          </Router>, document.getElementById('root'));
                                        

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
                          
        },
    });
}




  
  componentDidMount() {
     /* alert('componentDidMount');
     */ 
             
      var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
     /* console.log(department);
     */ var dept;
      dept += '<option value="" disabled selected hidden>Select a department</option>';
        $.each(department, function (i, item) {
        
          dept += '<option value="' + item.department + '">'+item.department+ '</option>'
          
        });
      $("#department").append(dept);
      
      var Role=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
     /* console.log(Role);
     */ var role;
      role += '<option value="" disabled selected hidden >Select a role</option>';
        $.each(Role, function (i, item) {
        
          role += '<option value="' + item.role + '">'+item.role+ '</option>'
          
        });
        console.log(this.props.data);
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
    
           
                  
             this.setState(
              {
                firstName:this.props.data.firstName,
                lastName:this.props.data.lastName, 
                dob:this.props.data.dob, 
                department:this.props.data.department,
                emailId:this.props.data.emailId,
                employeeType:this.props.data.employeeType,
                mobileNo:this.props.data.mobileNo,
                proofNo:this.props.data.proofNo,
                role:this.props.data.role,
                address:this.props.data.address,
                employeeId:this.props.data.employeeId,
                proofType:this.props.data.proofType,
                reportingManagerId:this.props.data.reportingManagerId,
                reportingManagerName:this.props.data.reportingManagerName,
                reportingManagerRole:this.props.data.reportingManagerRole,
                
              });
           }


render(){
    return(
      

      
  <div class="container"  style={{marginBottom:"30%"}}>
 <div style={{display:"inline-block"}}>
<label for="firstName">
     <h2>EmployeeId :</h2> 
       </label>
         <input type="text"
              onChange={this.handleUserInput}
              value={this.state.employeeId}
               id="employeeId"
               disabled
                name="employeeId"
                   required />
    

 </div>

  <form >
  
    <label for="firstName">
      First Name
        </label>
            <input type="text"
               onChange={this.handleUserInput}
               value={this.state.firstName}
                id="firstName"
                 name="firstName"
                   placeholder="Your name.."
                    required />

        <label for="lastName">
          Last Name
            </label>
                <input type="text" 
                onChange={this.handleUserInput}
                value={this.state.lastName}
                  id="lastName" 
                    name="lastName" 
                      placeholder="Your last name.." 
                        required />
     
                                <label for="proofType">
                                  Employee Proof
                                    </label>
                                      <select name="proofType"
                                          id="proofType"
                                            onChange={this.handleUserInput}
                                              value={this.state.proofType}
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
                        value={this.state.proofNo}
                        id="proofNo"
                           name="proofNo"
                              placeholder="Your Proof No.." 
                                required />


    <label for="dob">
      DOB
        </label>

        <input type="date"
          onChange={this.handleUserInput} 
            value={this.state.dob}
           id="dob"
            name="dob" 
              placeholder="Your DOB.."
                 required />
<br />

    <label for="emailId">
      Email ID
        </label>

    <input type="email"
      onChange={this.handleUserInput}
        value={this.state.emailId}
         id="emailId"
           name="emailId" 
            maxlength="50"
               placeholder="Your EmailID.." required />

          <label for="mobileNo">
            Mobile No
              </label>
            <input type="number"
            onChange={this.handleUserInput} 
            value={this.state.mobileNo}
             id="mobileNo"
              name="mobileNo" 
                maxlength="10"
                 pattern="^[0]?[789]\d{9}" 
                  placeholder="Your Mobile No.." required />

    <label for="address">
      Address
        </label>
    <textarea id="address" 
      onChange={this.handleUserInput}
        value={this.state.address} 
        name="address"
           maxlength="250" 
            placeholder="Your address.." required style={{height:'200px'}}> </textarea>
    
    <label for="employeeType">
      Emplooyee Type
        </label>
     <select name="employeeType" 
         id="employeeType"
            onChange={this.handleUserInput}
          value={this.state.employeeType}
       required>
                  <option value="" disabled selected hidden>Select your Type</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                </select>
           
             <label for="role">
                Role
                  </label>
     <select name="role"
        id="role"
             onChange={this.handleUserInput}
          value={this.state.role}
       required>

     </select>

   <label for="department">
      Department
        </label>

    <select name="department"
        id="department" 
             onChange={this.handleUserInput}
            value={this.state.department}
       required>

     </select>
     <label for="department">
                        Reporting Manager ID*
   			</label>
                    
                           
                        
                        <select
                            name="reportingManagerId"
                            id="reportingManagerId"
                           
                            onChange={this.handleReportingManager}
                            value={this.state.reportingManagerId}
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
                        
                      
   <input type="submit" className="btn btn-info" onClick={()=> this.SaveBtn()}  style={{ marginBottom: '30px',marginTop:"30px"}}value="SAVE" />
  </form>
</div>


 
 
  
        
      
    );
  }

}


export default EditEmployeeDetails;
