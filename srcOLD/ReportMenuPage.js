import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import DailyAttendanceReport from './DailyAttendanceReport';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import PeriodAttendanceReport from './PeriodAttendanceReport';
import EmployeeMaintenanceReport from './EmployeeMaintenanceReport';
import CryptoJS from 'crypto-js' ;
import EmployeeMenuPage from './EmployeeMenuPage';
import AuditReport from './AuditReport';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import MonthlyIndividualAttendanceReport from './MonthlyIndividualAttendanceReport';
import PeriodIndividualAttendanceReport from './PeriodIndividualAttendanceReport';
import { confirmAlert } from 'react-confirm-alert'; 



class ReportMenuPage extends Component{

	constructor() {
        super()

    var today = new Date();
    today= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
        this.state = {

		   date:today,
		   companyId:'',

			        };
			    }

				

DailyAttendanceFunc(){


	        ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route  path="/" component={() => <DailyIndividualAttendanceReport />}/>
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
		}
	


  MaintenanceReportFunc(){

	/*alert("Maintenance Report");
	*/
var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="report")
	{
		flag=0;//true
		/*console.log(flag);
*/	}	
	});
	
	 	if(flag==0){
	var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 this.state.companyId=companyId;

 this.setState({
   companyId:companyId,
 });
				 
				$.ajax({
				type: 'POST',
				data: JSON.stringify({
					
					companyId:this.state.companyId,
				}),
				url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeMaintenance",
				contentType: "application/json",
				dataType: 'json',
				async: false,
	
				success: function(data, textStatus, jqXHR)
	
				{
				 /* console.log(data);
				 alert(data);
				 */ 
	
				ReactDOM.render(
				<Router>
				  <div>
				  
						 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={() => <EmployeeMaintenanceReport data={data}/>}/>
						 
						
									 </div>
									  </Router>,
												document.getElementById('root'));
												registerServiceWorker();
			}
		
	});
		}else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })

	  }
	}
	
	


	 	 	
	PeriodAttendanceFunc(){
		ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 
					 <Route  path="/" component={PeriodIndividualAttendanceReport}/>
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();

	}	
MonthlyAttendanceFunc(){
	ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route  path="/" component={MonthlyIndividualAttendanceReport}/>
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();

}

AuditReportFunc()

{
	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="report")
	{
		flag=0;//true
		/*console.log(flag);
*/	}	
	});
	
	 	if(flag==0){
	 
  var today = new Date();
  today= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
  this.state.date=today;
  this.setState({
            	date:today,
                });
 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 this.state.companyId=companyId;

 this.setState({
   companyId:companyId,
 });

alert(this.state);
            $.ajax({
	        type: 'POST',
	        data: JSON.stringify({
				date:this.state.date,
				companyId:this.state.companyId,
	        }),
	        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/auditReport",
	        contentType: "application/json",
	        dataType: 'json',
	        async: false,

	        success: function(data, textStatus, jqXHR)
		{
		     console.log(data);
	             ReactDOM.render(
			<Router>
			  <div>
			  <Route path="/" component={EmployeeMenuHeader}/>
			  <Route  path="/" component={() => <AuditReport data={data}/>}/>
			  </div>
			</Router>,document.getElementById('root'));
			registerServiceWorker();
		}
});
        }else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
 }
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

			<div className="container" id="menucol"  style={{paddingTop:"25%",backgroundColor:"white"}}>
  	
	<ul class="previous disabled" 
   style={{float:"none",
   display:"inline-block",
   marginLeft:"5px",
   borderRadius: "5px",
   padding: "3px 7px 3px 7px"
   }}>
	   <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

 <div className="col-sm-12 col-xs-12 col-lg-12" style={{marginBottom:"10%"}}>
		
 <div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 
		<div className="col-xs-6" id="colcheckIn">
		
				<a  to="/Attendance" onClick={()=>this.DailyAttendanceFunc()} id="Dailycolstyle" className="" >Daily</a>
					</div>
				<div className="col-xs-6 " id="colcheckIn" >
					<a to="/Chart" onClick={()=>this.MonthlyAttendanceFunc()} id="Monthlycolstyle"  >Monthly</a>
							</div>
		</div>
		<div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 
						<div className="col-xs-6 " id="colcheckIn">
								<a to="/MaintenanceVoid" onClick={()=>this.PeriodAttendanceFunc()} id="Periodcolstyle">Period</a>
									</div>
					    <div className="col-xs-6 " id="colcheckIn" style={{paddingLeft:"0%"}}>
								<a to="/MaintenanceVoid" onClick={()=>this.MaintenanceReportFunc()} id="Maincolstyle">Maintenance</a>
									</div>

<div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 <div className="col-xs-6 " id="colcheckIn">
       <a to="/MaintenanceVoid" onClick={()=>this.AuditReportFunc()} id="Periodcolstyle">Audit</a>
 </div>
</div>

		
			{/*<div className="col-xs-6" id="colstyle">
						<a to="/ReportVoid"  id="Reportcolstyle">Reports</a>
							</div>*/}
						
					
						</div>
						</div>
			</div>
			
		);
	}

}
export default ReportMenuPage;

