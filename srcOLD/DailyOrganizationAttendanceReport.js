import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import CryptoJS from 'crypto-js';

class DailyOrganizationAttendanceReport extends Component{


  constructor(data) {
    super(data)

     var today = new Date();
   var today1= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+ today.getDate();
    this.state = {
             date:today1,
             companyId:'',
             employeeId:'',
       

            };
    }
    componentDidMount() {

         var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

  this.state.companyId=companyId;
  this.state.employeeId=employeeId;

     
            this.setState({
              date:this.state.date,
              companyId:this.state.companyId,
              employeeId:this.state.employeeId,

            });
      
    
            /*alert(this.state.date);
            */
       
       alert(JSON.stringify(this.state));
      

            $.ajax({
          type: 'POST',
          data: JSON.stringify(this.state),
          url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeOrganizationAttendanceDailyReport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function(data, textStatus, jqXHR)

          {
            console.log(data);
            alert("success");
          var tab='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>Dept</th><th>Type</th><th>CheckIn</th><th>CheckOut</th><th>#WorkHour</th><th>Status</th><th>AuthorizedBy</th></tr></thead>';
                  
                  
             $.each(data.employeeRetrievelist, function (i,item) {
               alert(item);
               tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.employeeType +'</td><td>'  + item.checkinTime +'</td><td>' + item.checkoutTime + '</td><td>'+item.totalWorkHour+'</td><td>' + item.status +'</td><td>' + item.authorizedBy + '</td></tr>';
            });
            $("#tableHeadings").append(tab);
            var summary='<thead><tr class="headcolor"><th>Type</th><th>#Employee</th><th>Present</th><th>Absent</th></tr></thead>';
             summary += '<tr class="success" ><td> Permanent</td><td>' + data.employeeCountRetrievelist[0].noOfPermanentEmployee + '</td><td>' +data.employeeCountRetrievelist[1].permanentCountPresent+ '</td><td>'  +data.employeeCountRetrievelist[2].permanentCountAbsent+'</td></tr>';
             summary += '<tr class="success" ><td> Contract</td><td>' + data.employeeCountRetrievelist[0].noOfContractEmployee + '</td><td>' +data.employeeCountRetrievelist[1].contractCountPresent+ '</td><td>'  +data.employeeCountRetrievelist[2].contractCountAbsent+'</td></tr>';
             summary += '<tr class="success" ><td> Temporary</td><td>' + data.employeeCountRetrievelist[0].noOfTemporaryEmployee + '</td><td>' +data.employeeCountRetrievelist[1].temporaryCountPresent+ '</td><td>'  +data.employeeCountRetrievelist[2].temporaryCountAbsent+'</td></tr>';
               
                  
            $("#summary").append(summary);
 


           }
         });

          }

        MyReport(){

           ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <DailyIndividualAttendanceReport />}/>
           
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
           }
           BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     
                     <Route path="/" component={ReportMenuPage}/>
                     
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
    
 <h3 className="centerAlign" style={{textAlign:"center"}}>Daily Attendance Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}>{this.state.date}</h4>
  <div id='horMenu'>
    <ul>
  <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.MyReport()}><span class="glyphicon glyphicon-user">My Report</span></a></li>
  <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.OrganizationReport()}><span class="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
 </ul>
 </div>
   
          <div id="tableOverflow" >
        <table style={{margin:"auto"}}class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
         <div id="tableOverflow">
        <table class="table" id="summary" style={{marginBottom:"30%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default DailyOrganizationAttendanceReport;