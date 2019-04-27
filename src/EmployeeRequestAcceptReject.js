
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';

import AttendanceRegulation from './AttendanceRegulation';
import AttendanceDisplay from './AttendanceDisplay';
import EmployeeMenuPage from './EmployeeMenuPage';
import AttendanceRegulationSupervisor from './AttendanceRegulationSupervisor';


import './Maintenance.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import CryptoJS from 'crypto-js' ;
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';

class EmployeeRequestAcceptReject extends Component{

	constructor() {
        super()
        this.state = {

			    }
            }
    
            AttendanceRequest(){
                ReactDOM.render(
                    <Router>
                      <div>			  
                         <Route path="/" component={EmployeeMenuHeader}/>
                         <Route  path="/" component={EmployeeRequestAcceptReject}/>
                         <Route  path="/" component={EmployeeAttendanceRequest}/>
                         
                              </div>
                                </Router>,
                                    document.getElementById('root'));
                                    registerServiceWorker();
            } 
        


            LeaveRequest(){

                ReactDOM.render(
                    <Router>
                      <div>			  
                         <Route path="/" component={EmployeeMenuHeader}/>
                         <Route  path="/" component={EmployeeRequestAcceptReject}/>
                         <Route  path="/" component={EmployeeLeaveRequest}/>
                         
                              </div>
                                </Router>,
                                    document.getElementById('root'));
                                    registerServiceWorker();
            }
	componentDidMount() {
       this.AttendanceRequest();
    }
    BackbtnFunc(){
      ReactDOM.render(
              <Router>
                <div>           
                       <Route path="/" component={EmployeeMenuHeader}/>
                       <Route path="/" component={EmployeeMenuPage}/>
                       
                               </div>
                                    </Router>,
                                              document.getElementById('root'));
                                              registerServiceWorker();
                                          }   


render(){
		return(
			
      <div className="container">
      <ul class="previous disabled" 
            style={{float:"none",
            display:"inline-block",
            marginLeft:"5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
            }}>
                <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
        
    
<div id='horMenu'>
    <ul>
  <li><a className="active" onClick={()=>this.AttendanceRequest()}><span class="glyphicon glyphicon-ok">Attendance Regularization Request</span></a></li>
  <li><a onClick={()=>this.LeaveRequest()}><span class="glyphicon glyphicon-time">Leave Request</span></a></li>
  
  </ul>

</div>


 </div>

	
				
			
		);
	}

}


export default EmployeeRequestAcceptReject;
