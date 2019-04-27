import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import RoleAddRemove from './RoleAddRemove';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;

class AddNewRole extends Component{

  constructor() {
        super()
        this.state = {
            role: '',
            department: '',
            companyId:'',
            superiorId:'',
                      };
          }

        handleUserInput = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          this.setState({[name]: value},
                        );
      }


         
AddRoleFunc(){
    
    /*alert(this.state.role);
    alert(this.state.department);
    */var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId=companyId;
    this.state.superiorId=superiorId;
		this.setState({
			companyId:companyId,
      superiorId:superiorId,
		});
		
    var self=this;
             /*alert(JSON.stringify(this.state));
             */$.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/addRole",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                      /* console.log(data);
                      */ if(data.authorization=="DUPLICATE"){
                        confirmAlert({
                          title: 'Role',                        // Title dialog
                          message: data.role +' Role Already Exist',               // Message dialog
                          confirmLabel: 'Ok',                           // Text button confirm
                                                    
                          
                           })
                          }
                          else{

                       var Role=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
                       Role.push({role:self.state.role});
                      /* console.log(Role);
                      */ localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(Role),"shinchanbaby"));
            
                       confirmAlert({
                            title: 'Role',                        // Title dialog
                            message: 'Your new Role has been Added',               // Message dialog
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
        
<div class="container" style={{ marginBottom: "30%"}}>>
<h2>Add New Role</h2>




 <form  style={{ paddingBottom: '20px',  position: 'inline-block'}}>

{/* <div className="col-xs-12 col-sm-12 col-lg-12">
 <label>
 Department*
 <select
 id="department" 
 className="form-control"
 onChange={this.handleUserInput}

 name="department" 
 style={{marginBottom:"15px"}}
 >
 </select>
 </label>
 
 </div>
 */}

<div className="col-xs-12 col-sm-12 col-lg-12" style={{marginTop:"20px", marginBottom:"20px"}} >
   <label>
      New Role Name* 
      <input
        type="text"
        value={this.state.role}
        required name="role"
        onChange={this.handleUserInput}
        className="form-control"
        id="role"
        placeholder="Enter New Role Name"
      />
    </label>

   
<button 
type="button"

 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "25px",
 display:"block"}}
   
  className="btn btn-success" 
  onClick={()=>this.AddRoleFunc()} 
 >Add</button>
  
  </div>
  
  
   </form> 
</div>           
                    
                
            );
        }
    
    }
    
    export default AddNewRole;

