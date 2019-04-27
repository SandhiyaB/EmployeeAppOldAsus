
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import TaskMapping from './TaskMapping'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import DepartmentAddRemove from './DepartmentAddRemove';

const required = (value, props) => {
 if (!value || (props.isCheckable && !props.checked)) {
 return <span className="form-error is-visible">Required</span>;
 }
};


/* 
const isEqual = (value, props, components) => {
 const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
 const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

 if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
 return <span className="form-error is-visible">Passwords are not equal.</span>;
 } 
}; */


class AddNewDepartment extends Component{

 constructor() {
 super()
 this.state = {

 
 department: '',
 companyId:'',
 };
 }

 handleUserInput = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({[name]: value},
  );
 }


 
Submit(){
 
 /*//alert(this.state.department);
 
 //alert(JSON.stringify(this.state));
 */var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId=companyId;
		this.setState({
			companyId:companyId,
		});
		
 var self=this;
 $.ajax({
 type: 'POST',
 data:JSON.stringify(this.state),
 url: "http://localhost:8080/EmployeeAttendenceAPI/employee/addDepartment",
 contentType: "application/json",
 dataType: 'json',
 async:false,
 success: function(data,textStatus,jqXHR)
 {
 /*console.log(data);
 */if(data.authorization=="DUPLICATE"){
    confirmAlert({
      title: 'Department',                        // Title dialog
      message: data.department +' Department Already Exist',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
                                
      
       })
      }
      else{

  
 var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
 department.push({department:self.state.department});
 /*console.log(department);
 */localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(department),"shinchanbaby"));
            
 confirmAlert({
 title: 'Department', // Title dialog
 message: 'New Department added successfully', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 
 
 })
}
 ReactDOM.render(
 <Router >
 <div>
 <Route path="/" component={EmployeeMenuHeader}/>
 <Route path="/" component={DepartmentAddRemove}/>
 
 
 <Route path="/" component={AddNewDepartment }/>
 
 </div>
 </Router>, document.getElementById('root'));
 

 },
 error:function(data) {
 /*console.log('#####################error:################################'+data);
 */confirmAlert({
  title: 'Server Error',                        // Title dialog
  message: 'Server Error Try Again Later',               // Message dialog
  confirmLabel: 'Ok',                           // Text button confirm
                            
  
   });                
         },
 });
 }
 

render(){
 return(
 
<div class="container" style={{ marginBottom: "30%"}}>
<h2>Add New Department</h2>




 <form style={{ paddingBottom: '20px', position: 'inline-block'}}>


<div className="col-xs-12 col-sm-12 col-lg-12" style={{marginTop:"20px", marginBottom:"20px"}} >
 <label>
 Department Name* 
 <input
 type="text"
 value={this.state.department}
 required name="department"
 onChange={this.handleUserInput}
 className="form-control"
 id="department"
 placeholder="Enter New Department Name"
 />
 </label>

 
<button 
type="button"
onClick={()=> this.Submit()}

 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "25px",
 display:"block"}}
  onClick={()=>this.Submit()} 
  class="btn btn-success" >ADD</button>
  
 </div>
 
 
 </form> 
</div> 
 
 
 );
 }
 
 }
 
 export default AddNewDepartment;

 /*<button type="button" id="submitAttendanceReg" style={{marginTop:"10px"}} onClick={()=>this.Submit()} class="btn btn-success">Add</button>*/