import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import TaskMapping from './TaskMapping'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;




class AddNewPermission extends Component{

  constructor() {
        super()
        this.state = {
        	permission:[],
        	role: '',
          valid:false,
          companyId:'',
          supervisorAuthority:1,
          superiorId:'',

                      };
          }

        handleUserInput = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          this.setState({[name]: [value],
                          valid:true,
                        });
    var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
    this.state.companyId=companyId;
    this.state.role=value;
    
    this.setState({
      companyId:companyId,
    });
    alert(JSON.stringify(this.state));
    /*alert(this.state.role);
                   alert(this.state.companyId);
    */
    var self =this;
    $.ajax({
                    type: 'POST',
                    data:JSON.stringify({
                      role:this.state.role.toString(),
                    companyId:this.state.companyId.toString(),
                    }),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/retrievePermission",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                      /* console.log(data);
                       alert(data);
                      */ 
                      console.log(data);
                      self.state.permission=[];
                      $("#attendance").prop('checked', false);
                      $("#chart").prop('checked', false);
                      $("#maintenance").prop('checked', false);
                      $("#report").prop('checked', false);
                      $("#attendanceRegulation").prop('checked', false);
                      $("#taskMapping").prop('checked', false);
                      $("#avoidAttendanceTracking").prop('checked', false);
                      $("#supervisorAuthority").prop('checked', false);
                      $("#leaveAuthorization").prop('checked', false);
                      
                      
                        if(data.employeePermisionlist.length!=0){
                        if(data.employeePermisionlist[0].permission!=""){
                       $.each(data.employeePermisionlist, function (i, item) {
                            $("#"+item.permission).prop('checked', true);

                      self.state.permission.push(item.permission);

                  });
                }
              }
                          ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                          <Route path="/" component={TaskMapping}/>
                   
                          <Route path="/" component={AddNewPermission}/>
                                                              
                            </div>
                          </Router>, document.getElementById('root'));
                                        

                    },
                    error:function(data) {
                        /* console.log('#####################error:################################'+data);
                        */ confirmAlert({
                            title: 'No Internet',                        // Title dialog
                            message: 'Network Connection Problem',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             });
                      
                    },
                    });
  
      }

      handleCheckBox = (e) => {
          const name = e.target.name;
          if ($('#'+name).is(':checked')) {
         $(name).attr('value', 'true');

          this.state.permission.push(name);
          
          }else{
           var i=this.state.permission.length;
          /* console.log(i);
          */
          while(i--){
           if(name== this.state.permission[i] )
             {
                
              this.state.permission.splice(i,1);
               } 
           
          }
            }        this.setState({permission: this.state.permission},
                                 );
      }



      handleSupervisorAuthority= (e) => {
        const name = e.target.name;
        if ($('#'+name).is(':checked')) {
       $(name).attr('value', 'true');

        this.state.permission.push(name);
        
        }else{
         var i=this.state.permission.length;
        /* console.log(i);
        */
        while(i--){
         if(name== this.state.permission[i] )
           {
            this.setState({
              supervisorAuthority:0,
              });
            this.state.permission.splice(i,1);
            console.log("splice");
             } 
         
        }
          }        this.setState({permission: this.state.permission,
                                 
        },
                               );
    }


componentDidMount() {
  /*/*
  for drop down
  alert('componentDidMount');
 var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Department'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
console.log(department);
var dept;
dept += '<option value="" disabled selected hidden>Select a department</option>';
  $.each(department, function (i, item) {
  
    dept += '<option value="' + item.department + '">'+item.department+ '</option>'
    
  });
$("#department").append(dept); */

var Role=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
/*console.log(Role);
*/var role;
role += '<option disabled selected hidden >Select a role</option>';
  $.each(Role, function (i, item) {
  
    role += '<option value="' + item.role + '">'+item.role+ '</option>'
    
  });
$("#role").append(role);

}

         
Submit(){
    
    /*alert(this.state.permission);*/
    var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
	var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

  	this.state.companyId=companyId;
    this.state.superiorId=superiorId;
		this.setState({
			companyId:companyId,
      superiorId:superiorId,
		});
		
    this.state.permission=this.state.permission.toString();
    this.state.role=this.state.role.toString();
    this.setState({
      permission:this.state.permission.toString(),
      role:this.state.role.toString(),
      companyId:this.state.companyId.toString(),
      supervisorAuthority:this.state.supervisorAuthority.toString(),
        superiorId:this.state.superiorId.toString(),
         });
        /*alert(this.state.permission);
    */var self=this;
    alert(JSON.stringify(this.state));
             $.ajax({
                    type: 'POST',
                    data:JSON.stringify({
                      permission:this.state.permission.toString(),
                    role:this.state.role.toString(),
                    companyId:this.state.companyId.toString(),
                    supervisorAuthority:this.state.supervisorAuthority.toString(),
                   superiorId:this.state.superiorId.toString(),
                    }),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeePermission",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                          console.log(data);
                       /*console.log(data);
                       */
                      if(data.authorization=="EMPLOYEE_EXIST"){
                        confirmAlert({
                          title: 'Cant Remove Supervisor Authority Permission ',                        // Title dialog
                          message: 'Employees Has Been Assigned to this Role '+self.state.role + ' So Cant remove Supervisor Authority Permission Please Assign Those Employee To Other Role',               // Message dialog
                          confirmLabel: 'Ok',                           // Text button confirm
                                                    
                          
                           })
                      } else{
                      confirmAlert({
                            title: 'Permission',                        // Title dialog
                            message: 'Updated Permission for '+self.state.role,               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                       var Role=CryptoJS.AES.decrypt(localStorage.getItem('Role'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
                       
                       if(self.state.role==Role){

                          localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data),"shinchanbaby"));
            
                    
                       }
                      }
                        ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                                         
                          <Route path="/" component={TaskMapping}/>
                                                              
                            </div>
                          </Router>, document.getElementById('root'));
                                        

                    },
                    error:function(data) {
                        /* console.log('#####################error:################################'+data);
                        */confirmAlert({
                            title: 'No Internet',                        // Title dialog
                            message: 'Network Connection Problem',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             });
                      
                    },
                    });
  }
  

render(){
    return(
        
<div class="container" style={{ marginBottom: '10%'}} >
<h2>Task Mapping</h2>
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
 
 </div> */}
  <div className="col-xs-12 col-sm-12 col-lg-12">
  <label>
    Role*
      <select
      id="role" 
      className="form-control"
      onChange={this.handleUserInput}
      name="role"
          >
       </select>
    </label>
     
  </div>
  
  
   </form> 
   <div class="btn-group">
  <div class="checkbox">
  <label><input type="checkbox" 
  				value={this.state.attendance} 
  				name="attendance"
				onChange={this.handleCheckBox}
				id="attendance"/>Attendance</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" 
  				value={this.state.chart} 
  				name="chart"
				onChange={this.handleCheckBox}
				id="chart"/>Charts</label>
</div>
<div class="checkbox ">
  <label><input type="checkbox" 
  				value={this.state.maintenance} 
  				name="maintenance"
				onChange={this.handleCheckBox}
				id="maintenance"/>Maintenance</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" 
  				value={this.state.report} 
  				name="report"
				onChange={this.handleCheckBox}
				id="report"/>Report</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" 
  				value={this.state.attendanceRegulation} 
  				name="attendanceRegulation"
				onChange={this.handleCheckBox}
				id="attendanceRegulation"/>Attendance Regulation</label>
</div>
<div class="checkbox ">
  <label><input type="checkbox" 
  				value={this.state.taskMapping} 
  				name="taskMapping"
				onChange={this.handleCheckBox}
				id="taskMapping"/>Task Mapping</label>
</div>
<div class="checkbox ">
  <label><input type="checkbox" 
          value={this.state.supervisorAuthority} 
          name="supervisorAuthority"
        onChange={this.handleSupervisorAuthority}
        id="supervisorAuthority"/>Supervisor Authority</label>
</div>
<div class="checkbox ">
  <label><input type="checkbox" 
          value={this.state.avoidAttendanceTracking} 
          name="avoidAttendanceTracking"
        onChange={this.handleCheckBox}
        id="avoidAttendanceTracking"/>Avoid Attendance Tracking</label>
</div>
<div class="checkbox ">
  <label><input type="checkbox" 
          value={this.state.leaveAuthorization} 
          name="leaveAuthorization"
        onChange={this.handleCheckBox}
        id="leaveAuthorization"/>Leave Authorization</label>
</div>

<button 
type="button"
onClick={()=> this.Submit()}
disabled={!this.state.valid}
 
 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "10px",
 }}

  class="btn btn-success" >Give Permission</button>


</div>           
</div>                    
                
            );
        }
    
    }
    
    export default AddNewPermission;
