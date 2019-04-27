
import React,{Component} from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import NoAttendanceRequest from './NoAttendanceRequest';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import { isFunction } from 'util';



class EmployeeAttendanceRequest extends Component{
	constructor() {
        super()
        this.state = {
            date:'',
            checkInTime:'',
            checkOutTime:'',
            employeeId:'',
            companyId:'',
        };
    }



        Request(){

            var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            
            this.state.companyId=companyId;
            this.state.employeeId=employeeId;
            
            this.setState({
                companyId:companyId,
                employeeId:employeeId,
            });
            
            var self=this;
          
            $.ajax({
                type: 'POST',
                data:JSON.stringify({
                 employeeId:this.state.employeeId,
                companyId:this.state.companyId,
                }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/EmployeeRequest",
                contentType: "application/json",
                dataType: 'json',
                async:false,
                success: function(data,textStatus,jqXHR)
                {
                    console.log(data);
                    console.log(data.attendanceRegulation.length);
                    if(data.attendanceRegulation.length!=0){
                    var tab='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>CheckIn</th><th>CheckOut</th><th>Date</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';
                  
                  
                    $.each(data.attendanceRegulation, function (i,item) {
                      /* alert(item);
                      */ tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.checkInTime + '</td><td>' + item.checkOutTime + '</td><td>'  + item.date  +'</td><td><button class="AcceptSelect"> Accept</button></td><td><button class="RejectSelect"> Reject</button></td></tr>';
                        /* tab+='<td><button class="btnSelect"> Accpet</button></td><td><button> Reject</button></td>' */
                    });
                   $("#tableHeadings").append(tab);
                   $("#accpet").click(self.Accept);
                }else{
        
                    ReactDOM.render(
                        <Router>
                          <div>			  
                                 <Route path="/" component={EmployeeMenuHeader}/>
                                 <Route path="/" component={EmployeeRequestAcceptReject}/>
                                
                                 <Route  path="/" component={NoAttendanceRequest} />								 		 </div>
                                              </Router>,
                                
                                                    document.getElementById('root'));
                                                    registerServiceWorker();
                                    
                }
               
                }

           

        });
        }

		componentDidMount() {
            this.Request();
        var self=this;
        $(document).ready(function(){

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click','.AcceptSelect',function(){
                 // get the current row
                 var currentRow=$(this).closest("tr"); 
                 
                 self.state.employeeId=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                 self.state.checkInTime=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                 self.state.checkOutTime=currentRow.find("td:eq(3)").text();
                 self.state.date=currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
                 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

                 self.state.reportingMangerId=employeeId;
                 self.state.companyId=companyId;

                 self.setState({

                    employeeId:self.state.employeeId,
            companyId:self.state.companyId,
            checkInTime:self.state.checkInTime,
            checkOutTime:self.state.checkOutTime,
            date:self.state.date,
            reportingMangerId:self.state.reportingMangerId,
                })
                 confirmAlert({
                    title: 'Accept',                        // Title dialog
                    message: 'Are you Accept the Request For ' + self.state.employeeId +' ? ',               // Message dialog
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
                 self.state.checkInTime=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                 self.state.checkOutTime=currentRow.find("td:eq(3)").text();
                 self.state.date=currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                 var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
                 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            
                 self.state.reportingMangerId=employeeId;
                 self.state.companyId=companyId;
                 self.setState({

                    employeeId:self.state.employeeId,
            companyId:self.state.companyId,
            checkInTime:self.state.checkInTime,
            checkOutTime:self.state.checkOutTime,
            date:self.state.date,
            reportingMangerId:self.state.reportingMangerId,
                })
                
    confirmAlert({
        title: 'Reject',                        // Title dialog
        message: 'Are you Reject the Request For ' + self.state.employeeId + ' ? ',               // Message dialog
        confirmLabel: 'Reject',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.RejectConfirm(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel
  
      })

        });
        });
    
    }



    RejectConfirm(currentRow){

      
        var self=this;
        $.ajax({
            type: 'POST',
            data:JSON.stringify({
             employeeId:this.state.employeeId,
            companyId:this.state.companyId,
            checkInTime:this.state.checkInTime,
            checkOutTime:this.state.checkOutTime,
            date:this.state.date,
            reportingMangerId:this.state.reportingMangerId,
            }),
            url: "http://localhost:8080/EmployeeAttendenceAPI/SupervisorAuthority/AttendanceRegulationReject",
            contentType: "application/json",
            dataType: 'json',
            async:false,
            success: function(data,textStatus,jqXHR)
            
            { confirmAlert({
                title: 'Success',                        // Title dialog
                message:  ' Rejected the Request For'+data.employeeId ,               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
  
  
              })
              currentRow.remove();
              ReactDOM.render(
                <Router>
                  <div>           
                         <Route path="/" component={EmployeeMenuHeader}/>
                         <Route path="/" component={EmployeeAttendanceRequest}/>
                         
                                 </div>
                                      </Router>,
                                                document.getElementById('root'));
                                                registerServiceWorker();
           
            
            },
                                            
                                            
    error:function(data){

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
                 <Route path="/" component={EmployeeAttendanceRequest}/>
                 
                         </div>
                              </Router>,
                                        document.getElementById('root'));
                                        registerServiceWorker();
   
    

}


    AcceptConfirm(currentRow){
        var self=this;
      
        $.ajax({
            type: 'POST',
            data:JSON.stringify({
             employeeId:this.state.employeeId,
            companyId:this.state.companyId,
            checkInTime:this.state.checkInTime,
            checkOutTime:this.state.checkOutTime,
            date:this.state.date,
            reportingMangerId:this.state.reportingMangerId,
            }),
            url: "http://localhost:8080/EmployeeAttendenceAPI/SupervisorAuthority/AttendanceRegulationAccept",
            contentType: "application/json",
            dataType: 'json',
            async:false,
            success: function(data,textStatus,jqXHR)
            
            {
                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message:  ' Accepted the Request For'+data.employeeId ,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
      
      
                  })
                  currentRow.remove();
                  ReactDOM.render(
                    <Router>
                      <div>           
                             <Route path="/" component={EmployeeMenuHeader}/>
                             <Route path="/" component={EmployeeAttendanceRequest}/>
                             
                                     </div>
                                          </Router>,
                                                    document.getElementById('root'));
                                                    registerServiceWorker();
               
                
                
                },
                                                
                                                
        error:function(data){

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
                 <Route path="/" component={EmployeeAttendanceRequest}/>
                 
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
    {/*   <ul class="previous disabled" 
      style={{float:"none",
      display:"inline-block",
      marginLeft:"5px",
      borderRadius: "5px",
      padding: "3px 7px 3px 7px",
      }}>
          <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
   */}
     <h3 className="centerAlign" style={{ textAlign: "center"}}>Attendance Regularization Request</h3>
        
            <table class="table" id="tableHeadings" style={{ marginBottom:"10%"}}>


          </table>
	</div>
		

		);
	}

}
export default EmployeeAttendanceRequest;