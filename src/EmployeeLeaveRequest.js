
import React,{Component} from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import EmployeeMenuHeader from './EmployeeMenuHeader';
import CryptoJS from 'crypto-js' ;
import NoLeaveRequest from './NoLeaveRequest';
import registerServiceWorker from './registerServiceWorker';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';


class EmployeeLeaveRequest extends Component{
	constructor() {
        super()
        this.state = {
			noOfDays:'',
			fromDate:'',
			toDate:'', 
			subject:'',
			reportingManagerId:'',
			companyId:'',
        };
    }

		componentDidMount() {




			var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            var reportingManagerId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            
            this.state.companyId=companyId;
            this.state.reportingManagerId=reportingManagerId;
            
            this.setState({
                companyId:companyId,
                reportingManagerId:reportingManagerId,
            });
            
            var self=this;
            
            $.ajax({
                type: 'POST',
                data:JSON.stringify({
					reportingManagerId:this.state.reportingManagerId,
                companyId:this.state.companyId,
                }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/leaveauthorize",
                contentType: "application/json",
                dataType: 'json',
                async:false,
                success: function(data,textStatus,jqXHR)
                {
                    console.log("success",data);
                     console.log(data.length);
                    if(data.length!=0){
                    var tab='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Days</th><th>From</th><th>To</th><th>Subject</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';
                  
                  
                    $.each(data, function (i,item) {
                      /* alert(item);
                     */ tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.day + '</td><td>' + item.fromDate + '</td><td>'  + item.toDate  +'</td><td>' + item.subject + '</td><td><button class="AcceptSelect"> Accept</button></td><td><button class="RejectSelect"> Reject</button></td></tr>';
                        /*  tab+='<td><button class="btnSelect"> Accpet</button></td><td><button> Reject</button></td>' 
             */        });
                   $("#tableHeadings").append(tab);
                   
                }else{
        
                    ReactDOM.render(
                        <Router>
                          <div>			  
                                 <Route path="/" component={EmployeeMenuHeader}/>
                                 <Route path="/" component={EmployeeRequestAcceptReject}/>
                                
                                 <Route  path="/" component={NoLeaveRequest} />								 		 </div>
                                              </Router>,
                                
                                                    document.getElementById('root'));
                                                    registerServiceWorker();
                                    
                }
                
                },
                error:function(data,textStatus,jqXHR){
                    confirmAlert({
                        title: 'Server Error',                        // Title dialog
                        message: 'Server Error Try Again Later',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                  
                        
                         });  
                }

           

        });



        $(document).ready(function(){

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click','.AcceptSelect',function(){
                 // get the current row
                 var currentRow=$(this).closest("tr"); 
                 
                 self.state.employeeId=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                 self.state.employeeName=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                 self.state.noOfDays=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                 self.state.fromDate=currentRow.find("td:eq(3)").text();
                 self.state.toDate=currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                 self.state.subject=currentRow.find("td:eq(5)").text(); // get current row 3rd TD
                 
                 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
                 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            
                 self.state.reportingManagerId=employeeId;
                 self.state.companyId=companyId;
              
                 self.setState({
                    employeeId:self.state.employeeId,
                   companyId:self.state.companyId,
                   date:self.state.fromDate,
                   noOfDays:self.state.noOfDays,
                   employeeName:self.state.employeeName,
                   fromDate:self.state.fromDate,
                   toDate:self.state.toDate,
                   subject:self.state.subject,
                   reportingManagerId:self.state.reportingManagerId,
                   
                   });

                 confirmAlert({
                    title: ' Accept',                        // Title dialog
                    message: 'Are you Accept the Request For ' + self.state.employeeId +' ?',               // Message dialog
                    confirmLabel: 'Accept',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.AcceptConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel
              
                  })
               
        
        });
        });
        
        
        $(document).ready(function(){
        
            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click','.RejectSelect',function(){
                 // get the current row
                 var currentRow=$(this).closest("tr"); 
                 
                 self.state.employeeId=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                 self.state.employeeName=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                 self.state.noOfDays=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                 self.state.fromDate=currentRow.find("td:eq(3)").text();
                 self.state.toDate=currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                 self.state.subject=currentRow.find("td:eq(5)").text(); // get current row 3rd TD
                 
                 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
                 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            
                 self.state.reportingManagerId=employeeId;
                 self.state.companyId=companyId;
                 self.setState({
                    employeeId:self.state.employeeId,
                   companyId:self.state.companyId,
                   date:self.state.fromDate,
                   noOfDays:self.state.noOfDays,
                   employeeName:self.state.employeeName,
                   fromDate:self.state.fromDate,
                   toDate:self.state.toDate,
                   subject:self.state.subject,
                   reportingManagerId:self.state.reportingManagerId,
                   
                   });


                   confirmAlert({
                    title: 'Reject',                        // Title dialog
                    message: 'Are you Reject the Request For ' + self.state.employeeId + ' ',               // Message dialog
                    confirmLabel: 'Reject',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.RejectConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel
              
                  })
            
                
        
        });
        });
        
        
       
}




AcceptConfirm(currentRow){
var self=this;
    $.ajax({
        type: 'POST',
        data:JSON.stringify({
         employeeId:self.state.employeeId,
        companyId:self.state.companyId,
        date:self.state.fromDate,
        noOfDays:self.state.noOfDays,
        employeeName:self.state.employeeName,
        fromDate:self.state.fromDate,
        toDate:self.state.toDate,
        subject:self.state.subject,
        reportingManagerId:self.state.reportingManagerId,
    }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/leaveauthorized",
        contentType: "application/json",
        dataType: 'json',
        async:false,
        success: function(data,textStatus,jqXHR)
        
        {
           
            confirmAlert({
                title: 'Success',                        // Title dialog
                message:  ' Accepted the Request For '+self.state.employeeId ,               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
  
  
              })
              currentRow.remove();
    
            ReactDOM.render(
                <Router>
                  <div>			  
                         <Route path="/" component={EmployeeMenuHeader}/>
                        
                         <Route  path="/" component={EmployeeLeaveRequest}/>
                                  </div>
                                      </Router>,
                                                document.getElementById('root'));
                                                registerServiceWorker();
        
        },
        error:function(data,textStatus,jqXHR){
            confirmAlert({
                title: 'Server Error',                        // Title dialog
                message: 'Server Error Try Again Later',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
                                          
                
                 });  
        }

    
});

ReactDOM.render(
    <Router>
      <div>			  
             <Route path="/" component={EmployeeMenuHeader}/>
            
             <Route  path="/" component={EmployeeLeaveRequest}/>
                      </div>
                          </Router>,
                                    document.getElementById('root'));
                                    registerServiceWorker();

}

RejectConfirm(currentRow){
var self=this;
    $.ajax({
        type: 'POST',
        data:JSON.stringify({
         employeeId:self.state.employeeId,
        companyId:self.state.companyId,
        date:self.state.date,
        noOfDays:self.state.noOfDays,
        employeeName:self.state.employeeName,
        fromDate:self.state.fromDate,
        toDate:self.state.toDate,
        subject:self.state.subject,
        reportingManagerId:self.state.reportingManagerId,
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/leavenotauthorized",
        contentType: "application/json",
        dataType: 'json',
        async:false,
        success: function(data,textStatus,jqXHR)
        
        {
           
            confirmAlert({
                title: 'Success',                        // Title dialog
                message:  ' Rejected the Request For '+self.state.employeeId ,               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
  
  
              })
            currentRow.remove();
            ReactDOM.render(
                <Router>
                  <div>			  
                         <Route path="/" component={EmployeeMenuHeader}/>
                        
                         <Route  path="/" component={EmployeeLeaveRequest}/>
                                  </div>
                                      </Router>,
                                                document.getElementById('root'));
                                                registerServiceWorker();
        
        },
        error:function(data,textStatus,jqXHR){
            confirmAlert({
                title: 'Server Error',                        // Title dialog
                message: 'Server Error Try Again Later',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
                                          
                
                 });  
        }

    
});
ReactDOM.render(
    <Router>
      <div>			  
             <Route path="/" component={EmployeeMenuHeader}/>
            
             <Route  path="/" component={EmployeeLeaveRequest}/>
                      </div>
                          </Router>,
                                    document.getElementById('root'));
                                    registerServiceWorker();


}

NoAction() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={EmployeeAttendanceRequest} />


        </div>
      </Router>, document.getElementById('root'));
  

  }
         
	render(){
		return(

			<div className="container">
			{/* <ul class="previous disabled" 
			style={{float:"none",
			display:"inline-block",
			marginLeft:"5px",
			borderRadius: "5px",
			padding: "3px 7px 3px 7px",
			}}>
				<a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
		 */}
		   <h3 className="centerAlign" style={{ textAlign: "center"}}>Leave Request</h3>
			  
				  <table class="table" id="tableHeadings" style={{ marginBottom:"10%"}}>
	  
	  
				</table>
		  
			</div>
		

		);
	}

}
export default EmployeeLeaveRequest;
