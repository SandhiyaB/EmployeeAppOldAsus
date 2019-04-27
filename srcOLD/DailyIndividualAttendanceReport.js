import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyOrganizationAttendanceReport from './DailyOrganizationAttendanceReport';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; 

class DailyIndividualAttendanceReport extends Component{


  constructor(data) {
    super(data)

    var today = new Date();
   var today1= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+ today.getDate();

       
        this.state = {
             date:today1,
             employeeId:'',
             companyId:'',
       

            };
    }
  componentDidMount() {
      var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

  this.state.companyId=companyId;
  this.state.employeeId=employeeId;

     
            this.setState({
              date:this.state.today1,
              companyId:this.state.companyId,
              employeeId:this.state.employeeId,

            });
            /*alert(this.state.date);
            */
       
       alert(JSON.stringify(this.state));
      

            $.ajax({
          type: 'POST',
          data: JSON.stringify(this.state),
          url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeIndividualAttendanceDailyReport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function(data, textStatus, jqXHR)

          {
            console.log(data);
            alert("success");
             /*
             alert(data);
            */
                    var tab='<thead><tr className="headcolor"><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut</th><th>#WorkHour<th>AuthorizedBy</th><th>Type</th></tr></thead>';
                  
                  
             $.each(data.employeeRetrievelist, function (i,item) {
          
                tab += '<tr className="success" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>'  + item.checkinTime +'</td><td>' + item.checkoutTime + '</td><td>'+item.totalWorkHour+'</td><td>' + item.authorizedBy + '</td><td>' + item.employeeType +'</td></tr>';
            });
            $("#tableHeadings").append(tab);
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
               OrganizationReport()
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
*/  } 
  });


    if(flag==0){
  ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <DailyOrganizationAttendanceReport />}/>
           
     
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
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
  <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.MyReport()}><span className="glyphicon glyphicon-user">My Report</span></a></li>
  <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.OrganizationReport()}><span className="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
 </ul>
 </div>

          <div id="tableOverflow" >
        <table style={{margin:"auto"}}className="table" id="tableHeadings">
        
      
         </table>
         
        </div>

         <div id="tableOverflow">
        <table className="table" id="summary" style={{marginBottom:"30%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default DailyIndividualAttendanceReport;
