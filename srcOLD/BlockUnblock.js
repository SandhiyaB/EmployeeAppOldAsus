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
import TaskMapping from './TaskMapping';

class BlockUnblock extends Component{

  constructor() {
        super()
        this.state = {

            employeeId: '',
            block:'',
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
        
        ChangeBlock(e)
        {
          this.setState(
            {
              block:e,
            }
          );
        }
        Submit(){
    
   /* alert(this.state.department);
   */
    var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId=companyId;
    this.state.superiorId=superiorId;

		this.setState({
			companyId:companyId,
      superiorId:superiorId,
    });
    
            /* alert(JSON.stringify(this.state));
            */ $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeBlockUnblock",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                      /* console.log(data);
                      */ if(data.employeeName=="NOT_VALID"){
                        confirmAlert({
                          title: 'Invalid EmployeeId',                        // Title dialog
                          message: 'Enter Valid Employee Id',               // Message dialog
                          confirmLabel: 'Ok',                           // Text button confirm
                        })    
                       }else if(data.employeeName=="NOT_BLOCKED"){

                        confirmAlert({
                          title: 'Cant Unblock',                        // Title dialog
                          message: data.employeeId +' is Not Blocked',            // Message dialog
                          confirmLabel: 'Ok',                           // Text button confirm
                           })
                   } else{
                     
                    confirmAlert({
                      title: data.status,                        // Title dialog
                      message: data.employeeId +' is '+data.status,            // Message dialog
                      confirmLabel: 'Ok',                           // Text button confirm
                    })
                   }
                        ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                          <Route path="/" component={TaskMapping}/>
                                         
                          <Route path="/" component={BlockUnblock}/>
                                                              
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
  
  componentDidMount() {
     /*alert('componentDidMount');
  */
  
  /*console.log(emp);
  */var employeeId;
  employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
    $.each(this.props.data, function (i, item) {
    
      employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'
      
    });
  $("#employeeId").append(employeeId);
  
  }
  

render(){
    return(
        
<div class="container">
<h2>Block/Unblock</h2>

 <form  style={{ paddingBottom: '20px',  position: 'inline-block'}}>
   

 <div className="col-xs-12 col-sm-12 col-lg-12">
 <label>
   Employee Id*
     <select
     id="employeeId" 
     className="form-control"
     onChange={this.handleUserInput}
     name="employeeId"
         >
      </select>
   </label>
    
 </div>
 
  <div class="form-group">

<div className="col-xs-8 col-sm-7 col-lg-7">
    <div class="radio">
    <label style={{fontSize:"20px"}} ><input type="radio"  onClick={(e)=>this.ChangeBlock("1")} name="optradio"/>Block</label>
    </div>
    </div>
  
<div className="col-xs-8 col-sm-6 col-lg-6">
    <div class="radio">
    <label style={{fontSize:"20px"}}><input type="radio" name="optradio" onClick={(e)=>this.ChangeBlock("0")}/>UnBlock</label>
    </div>
  
  </div>

</div>

   </form> 
   <button type="button"
 onClick={()=> this.Submit()}
 className="btn btn-primary" 
 style={{marginLeft:"auto",marginRight: "auto",marginTop: "140px", marginBottom:'75px',display:"block"}}
 >Submit</button>
</div>           
                    
                
            );
        }
    
    }
    
    export default BlockUnblock;