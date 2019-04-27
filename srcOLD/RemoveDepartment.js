import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
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

import AddNewDepartment from './AddNewDepartment';
import RoleAddRemove from './RoleAddRemove';

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


class RemoveDepartment extends Component{

  constructor() {
        super()
        this.state = {

            department: '',
           valid:false,
           companyId:'',
           superiorId:'',
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
            /*//for drop down
            alert('componentDidMount');
          */
          var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
         /* console.log(department);
         */ var dept;
          dept += '<option  value="" disabled selected hidden>Select a department</option>';
            $.each(department, function (i, item) {
            
              dept += '<option value="' + item.department + '">'+item.department+ '</option>'
              
            });
          $("#department").append(dept);
          
          }
          


         
      RemoveDepartmentFunc(){
    
    /*alert(this.state.department);
    */var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId=companyId;
    this.state.superiorId=superiorId;
		this.setState({
			companyId:companyId,
      superiorId:superiorId,
		});
             /*alert(JSON.stringify({

              department: this.state.department,
           
           companyId:this.state.companyId,}
               
              ));
            */ var self=this;
             $.ajax({
                    type: 'POST',
                    data:JSON.stringify(
                      {

                        department: this.state.department,
                     
                     companyId:this.state.companyId,
                     superiorId:this.state.superiorId,
                   }
                    ),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/deletedepartment",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                      /* console.log("data",data);
                      */ if(data.authorization=="DELETED"){
                       confirmAlert({
                                title: 'Removed ',                        // Title dialog
                                message: 'successfully Removed  '+ self.state.department,               // Message dialog
                                confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                       var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
                     /* console.log(department);
                     */ var del=self.state.department;
                      var key;
                      var i=department.length;
                     /* console.log(i);
                     */
                    while(i--){
                      if(del== department[i].department )
                        {
                          key=i; 
                          department.splice(i,1);
                       } 
                        
                    }
                    
                  /*  console.log(department);
                  */  localStorage.setItem('Department', CryptoJS.AES.encrypt(JSON.stringify(department),"shinchanbaby"));
            }else{
                       
                       confirmAlert({
                                title: 'Cant Remove Department ',                        // Title dialog
                                message: 'Cant Remove Department '+self.state.department +' Because Employee Exit in that Department ',               // Message dialog
                                confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                       

                       } ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                            <Route path="/" component={RoleAddRemove}/>
                                  
                          <Route path="/" component={AddNewDepartment}/>
                                                              
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
  

render(){
    return(
        
<div class="container" style={{marginBottom:"30%"}}>
<h2>Remove Department</h2>




 <form  style={{ paddingBottom: '20px',  position: 'inline-block'}}>


 <div className="col-xs-12 col-sm-12 col-lg-12">
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
 
 
  
<button 
type="button"

 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "50px",
 display:"block"}}
 disabled={!this.state.valid} 
  className="btn btn-danger" 
  onClick={()=>this.RemoveDepartmentFunc()} 
 >Remove</button>
  
  </div>
 
  
   </form> 
</div>           
                    
                
            );
        }
    
    }
    
    export default RemoveDepartment;