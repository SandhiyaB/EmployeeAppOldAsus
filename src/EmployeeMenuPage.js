import React,{Component} from 'react';
import ReactDOM from 'react-dom';



import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import Charts from './Charts';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import TaskMapping from './TaskMapping';
import LeaveManagement from './LeaveManagement';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import ConfigurationPage from './ConfigurationPage';


class EmployeeMenuPage extends Component{

	constructor() {
        super()
        this.state = {

			date:'',
			companyId:'',

			        };
			    }

				handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  );
			}



AttendanceFunc(){
	//var permission=CryptoJS.AES.decrypt(localStorage.getItem('Permission').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
	/*	console.log(item.permission);
	*/
	if(item.permission=="attendance")
	{
		flag=0;//true
		/*console.log(flag);
	*/}	
	});
	
	 	if(flag==0){
	 	 
			ReactDOM.render(
				<Router>
				  <div>
				  
						 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={Attendence}/>
						 
						
									 </div>
									  </Router>,
												document.getElementById('root'));
			
			}
			else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
	 	 }
		



ChartFunc(){

	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="chart")
	{
		flag=0;//true
		/*console.log(flag);
*/	}	
	});
	
	 	if(flag==0){
	 	 
	var today= new Date();
	 	 	today=today.getFullYear() + '-'+ (today.getMonth() +1)+'-'+today.getDate();
        
        this.state.date=today;
       /* alert(this.state.date);
    	*/this.setState(
    	{
    		date:today,
		});
		var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId=companyId;
		this.setState({
			companyId:companyId,
		});

            /* alert(JSON.stringify(this.state));
            */ $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeChart",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                    {
                       /*console.log(data);
                       alert("Chart");																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										
                      */ 
					 console.log(data);
                       ReactDOM.render(
					<Router>
			 			 <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route  path="/" component={()=> <Charts data={data}/>}/>
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
	 	 
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
else{
	confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
	 	 }

MaintenanceFunc(){
	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="maintenance")
	{
		flag=0;//true
		/*console.log(flag);
*/	}	
	});
	
	 	if(flag==0){
	 
			
			
			ReactDOM.render(
				<Router>
				  <div>
				  
						 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={Maintenance}/>
						 
						
									 </div>
									  </Router>,
												document.getElementById('root'));
		
			}
			else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
	 	 }
		


	ReportFunc(){
		
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
	 
			ReactDOM.render(
				<Router>
				  <div>
				  
						 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={ReportMenuPage}/>
						  </div>
									  </Router>,
												document.getElementById('root'));
												registerServiceWorker();
	}
			else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
	 	 }
		
AttendanceRegulationsFunc(){
	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="attendanceRegulation")
	{
		flag=0;//true
		/*console.log(flag);
	*/}	
	});
	
	 	if(flag==0){
	 	 
			ReactDOM.render(
				<Router>
				  <div>
					 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={AttendanceRegulationMenuPage}/>
						  </div>
									  </Router>,
												document.getElementById('root'));
												registerServiceWorker();
	
			}
			else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
	 	 }

TaskMappingFunc(){

	var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
	var flag= 1;//false
	var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
		/*console.log(item.permission);
	*/
	if(item.permission=="taskMapping")
	{
		flag=0;//true
		/*console.log(flag);
*/	}	
	});
	
	 	if(flag==0){
			ReactDOM.render(
				<Router>
				  <div>
					 <Route path="/" component={EmployeeMenuHeader}/>
						 <Route  path="/" component={TaskMapping}/>
						  </div>
									  </Router>,
												document.getElementById('root'));
												registerServiceWorker();
	
			


			}
			else{
					confirmAlert({
							      title: 'Access Deined',                        // Title dialog
							      message: 'You are not Allowed to Access this Page',               // Message dialog
							      confirmLabel: 'Ok',                           // Text button confirm
							      

			
			      })
}


	 	 			
		  }

		  ConfigurationFunc(){

	ReactDOM.render(
		<Router>
		  <div>
			 <Route path="/" component={EmployeeMenuHeader}/>
				 <Route  path="/" component={ConfigurationPage}/>
				  </div>
							  </Router>,
										document.getElementById('root'));
										registerServiceWorker();
										}
		  


	EmployeeRequestFunc(){

		var permission=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
	
		var flag= 1;//false
		var i = permission.length;
		/*console.log(i);
		*/$.each(permission, function (i, item) {
			/*console.log(item.permission);
		*/
		if(item.permission=="supervisorAuthority")
		{
			flag=0;//true
			/*console.log(flag);
	*/	}	
		});
		
			 if(flag==0){
				ReactDOM.render(
					<Router>
					  <div>
						 <Route path="/" component={EmployeeMenuHeader}/>
							 <Route  path="/" component={EmployeeRequestAcceptReject}/>
							  </div>
										  </Router>,
													document.getElementById('root'));
													registerServiceWorker();
		
	
				}
				else{
						confirmAlert({
									  title: 'Access Deined',                        // Title dialog
									  message: 'You are not Allowed to Access this Page',               // Message dialog
									  confirmLabel: 'Ok',                           // Text button confirm
									  
	
				
					  })
	}
	
	

	}

render(){
		return(
			
			<div className="container" id="menucol" style={{ backgroundColor: 'white', marginBottom: "10%"}}>

                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="AttendancecolcheckIn">
                        <a  to="/" onClick={() => this.AttendanceFunc()} id="Attendancecolstyle" className=""></a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="ChartcolcheckIn">
                        <a   to="/" id="Chartcolstyle" onClick={() => this.ChartFunc()} ></a>
                    </div>
                </div>
                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="MaintenancecolcheckIn">
                        <a   to="/" onClick={() => this.MaintenanceFunc()} id="Maintenancecolstyle" className=""></a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="ReportcolcheckIn">
                        <a   to="/" id="Reportcolstyle" onClick={() => this.ReportFunc()} ></a>
                    </div>
                </div>
                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="AttendanceRegcolcheckIn">
                        <a    to="/"onClick={() => this.AttendanceRegulationsFunc()} id="AttendanceRegcolstyle" className=""></a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="TaskMappingcolcheckIn">
                        <a   to="/" id="TaskMappingcolstyle" onClick={() => this.TaskMappingFunc()} ></a>
                    </div>
                </div>
				<div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="LeaveManagementcolcheckIn">
                        <a    to="/" onClick={() => this.ConfigurationFunc()} id="AttendanceRegcolstyle" className=""></a>
                    </div>
					<div className="col-sm-6 col-xs-6" id="TaskMappingcolcheckIn">
                        <a   to="/" id="TaskMappingcolstyle" onClick={() => this.EmployeeRequestFunc()} ></a>
                    </div>
               
                </div>

                </div>		
		);
	}

}


export default EmployeeMenuPage;

		/*<div className="container-fluid" id="rowid" style={{backgroundColor:'white'}}>
  
 
 <div className="row"  style={{backgroundColor:'white'}}>
 
		<div className="col-xs-6" id="colstyle">
				<a  to="/Attendance" onClick={()=>this.AttendanceFunc()} id="Attendancecolstyle" className="" >Attendance</a>
					</div>
				<div className="col-xs-6" id="colstyle" >
					<a to="/Charts" onClick={()=>this.ChartFunc()} id="Chartcolstyle"  >Chart</a>
							</div>
						<div className="col-xs-6" id="colstyle">
								<a to="/MaintenanceVoid" onClick={()=>this.MaintenanceFunc()} id="Maintenancecolstyle">Maintenance</a>
									</div>
			<div className="col-xs-6" id="colstyle">
						<a to="/ReportVoid" onClick={()=>this.ReportFunc()} id="Reportcolstyle">Report</a>
							</div>
				<div className="col-xs-6" id="colstyle">
							<a to="/ReportVoid" onClick={()=>this.AttendanceRegulationsFunc()} id="AttendanceRegcolstyle" ><div style={{display:"inline-block",paddingLeft:"0px",paddingBottom:"115px"}}>Attendance Regulations</div></a>
								</div>
					<div className="col-xs-6" id="colstyle">
								<a to="/ReportVoid" onClick={()=>this.TaskMappingFunc()} id="TaskMappingcolstyle"><div style={{display:"inline-block",paddingLeft:"0px",paddingBottom:"115px"}}>&nbsp; &nbsp; &nbsp; Task &nbsp; &nbsp; &nbsp; Mapping</div></a>
									</div>
						
						</div>
			</div>
			

			<div className="container" id="menucol" style={{ backgroundColor: 'white' }}>

                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a  to="/" onClick={() => this.AttendanceFunc()} id="Attendancecolstyle" className="">Attendance</a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a   to="/" id="Chartcolstyle" onClick={() => this.ChartFunc()} >Chart</a>
                    </div>
                </div>
                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a   to="/" onClick={() => this.MaintenanceFunc()} id="Maintenancecolstyle" className="">Maintenance</a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a   to="/" id="Reportcolstyle" onClick={() => this.ReportFunc()} >Report</a>
                    </div>
                </div>
                <div className="row" id="checkInOut">
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a    to="/"onClick={() => this.AttendanceRegulationsFunc()} id="AttendanceRegcolstyle" className="">Attendance Regularization</a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a   to="/" id="TaskMappingcolstyle" onClick={() => this.TaskMappingFunc()} >Task Mapping</a>
                    </div>
                </div>

                </div>
			
			*/