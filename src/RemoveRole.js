import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import RoleAddRemove from './RoleAddRemove';


import AddNewRole from './AddNewRole';
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


class RemoveRole extends Component{

 constructor() {
 super()
 this.state = {

	role: '',
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


 
 handleAddNew(value) {
 this.setState({
 department :value,
 });
 }
 
componentDidMount() {
  
var Role=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
/*console.log(Role);
*/var role;
role += '<option disabled selected hidden >Select a role</option>';
  $.each(Role, function (i, item) {
  
    role += '<option value="' + item.role + '">'+item.role+ '</option>'
    
  });
$("#role").append(role);

}


 


 
 RemoveRoleFunc(){
 
 
 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 this.state.companyId=companyId;

 this.setState({
   companyId:companyId,
 });

 var self=this;
 $.ajax({
 type: 'POST',
 data:JSON.stringify(({
  role: this.state.role,
	companyId:this.state.companyId
 })),
 url: "http://localhost:8080/EmployeeAttendenceAPI/employee/deleterole",
 contentType: "application/json",
 dataType: 'json',
 async:false,
 success: function(data,textStatus,jqXHR)
 {
 /*console.log("data",data);*/
if(data.authorization=="DELETED"){
                       
 var role=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
 /*console.log(role);
 */var del=self.state.role;
 var key;
 var i=role.length;
/* console.log(i);
*/
while(i--){
 if(del== role[i].role )
   {
     key=i; 
     role.splice(i,1);
  } 
   
}

/*console.log(role);
*/localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(role),"shinchanbaby"));

 confirmAlert({
 title: 'Remove Role', // Title dialog
 message: 'successfully Removed Role '+self.state.role, // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 
 
 })

}
else{
                       
                       confirmAlert({
                                title: 'Cant Remove Role ',                        // Title dialog
                                message: 'Cant Remove Role '+self.state.role +' Because Employee Exit in that Role ',               // Message dialog
                                confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                       

                       }
 ReactDOM.render(
 <Router >
 <div>
 <Route path="/" component={EmployeeMenuHeader}/>
 <Route path="/" component={RoleAddRemove}/>
 
 
 </div>
 </Router>, document.getElementById('root'));
 

 },
 error:function(data) {
 /*console.log('#####################error:################################'+data);
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
 
<div class="container" style={{ marginBottom: "30%"}}>>
<h2>Remove Role</h2>


<form  style={{ paddingBottom: '20px',  position: 'inline-block'}}>



<div className="col-xs-12 col-sm-12 col-lg-12" style={{marginTop:"20px", marginBottom:"20px"}} >
   <label>
      Role Name* 
      <select
 id="role" 
 className="form-control"
 onChange={this.handleUserInput}

 name="role" 
 style={{marginBottom:"15px"}}
 >
 <option value="" disabled selected hidden>Select your role</option>
 </select>
 </label>
 
 </div>
<div>
<button 
type="button"

 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "25px",
 display:"block"}}
 disabled={!this.state.valid}
  className="btn btn-danger" 
  onClick={()=>this.RemoveRoleFunc()} 
 >Remove</button>
  
 </div>
 
 
 </form> 
</div> 
 
 
 );
 }
 
 }
 
 export default RemoveRole;