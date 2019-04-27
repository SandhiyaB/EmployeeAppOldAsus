import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
import {
    FormErrors
} from './FormErrors';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
//import timepicker from 'jquery-ui-timepicker-addon/src/jquery-ui-timepicker-addon';
//import timepicker from 'jquery-ui/ui/widgets/timepicker';
//import timepicker from 'timepicker/jquery.timepicker';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import OneDay from './OneDay';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeMenuPage from './EmployeeMenuPage';
import LeaveManagement from './LeaveManagement';

class MoreThanOneDay extends Component {


    constructor(props) {
        super(props)
       
        
       this.state = {
           
            noOfDays:'',
            fromDate:'',
            toDate:'',
            reason:'',
            subject:'',
            startdate:'',
            enddate:'',
            day:'morerthanoneday',
            leaveType:'',
 
        }
    }
    componentDidMount() {
        var self = this;



        $('#toDate').datepicker({ 
            onSelect: function(date) {$("#leavetype").attr("disabled","true");
              var dt = new Date(date);
                 dt.setDate(dt.getDate() - 1);
                 $("#fromDate").datepicker("option", "maxDate", dt);
            self.setState({
             toDate:date,
                         });
            $("#leavetype").attr("disabled",false);
                       },

          dateFormat: 'yy/mm/dd',
          minDate: 'M', 
          maxDate: '+3M',
         numberOfMonths:1 } );

         $('#fromDate').datepicker({
           onSelect: function(date) {
             var dt = new Date(date);
                 dt.setDate(dt.getDate() + 1);
                 $("#toDate").datepicker("option", "minDate", dt);
            self.setState({
             fromDate:date,
            });
$( "#toDate" ).datepicker( "option", "disabled", false );
          },

           dateFormat: 'yy/mm/dd',
           minDate: 'M',
           maxDate: '+3M', 
           numberOfMonths:1 });  

         $("#noofdayslabel").hide();
       

        self.Validation();
      self.Validation1();
         self.GetLeaveType();
}

 handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
           
        });
      }

 
  handleUserInputLeaveType = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.state.leaveType=value;
        this.setState({
            [name]: value,
           
        });

         this.state.startdate=new Date(this.state.fromDate);
this.state.enddate=new Date(this.state.toDate);
 this.state.noOfDays=Number(Math.floor((Date.UTC((this.state.enddate).getFullYear(),
  (this.state.enddate).getMonth(), (this.state.enddate).getDate()) 
 - Date.UTC((this.state.startdate).getFullYear(), (this.state.startdate).getMonth(),
  (this.state.startdate).getDate()) ) /(1000 * 60 * 60 * 24)))+1;
      
     
       this.setState({
             noOfDays:this.state.noOfDays,
            });
            
        var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
       
       this.state.companyId=companyId;
       this.state.employeeId=employeeId;  

 this.setState({
            companyId:this.state.companyId,
            employeeId:this.state.employeeId,
            leaveType:this.state.leaveType,
           
        });

        alert(JSON.stringify(this.state));
        var self=this;
        
$.ajax({ 

                type: 'POST',
               data:JSON.stringify({ 
                companyId:this.state.companyId,
                employeeId:this.state.employeeId,
                leaveType:this.state.leaveType,
    }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/getleavedays",
                contentType: "application/json",
                dataType: 'json',
                async:false,
                success: function(data,textStatus,jqXHR)
                {
                  alert("success");
                  console.log(data);
                 var leaveDays=data.day;
                  var noOfDays1=self.state.noOfDays;
                 if(leaveDays<noOfDays1){
                    //alert("you cannot opt for this leaveType because it exceeeds your count");
                   confirmAlert({
                        title: 'Failed',                        // Title dialog
                        message: 'you cannot opt for this leaveType because it exceeeds your count try another',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                              
                         }); 
                    self.state.noOfDays="";
                    self.state.fromDate="";
                    self.state.toDate="";
                    self.state.leaveType="";

                     self.setState({
                    leaveType: self.state.leaveType,
                    noOfDays:self.state.noOfDays,
                    });
                    
                $('leavetype option[text="Select leave type"]').attr('selected','selected');
           $( "#toDate" ).datepicker( "option", "disabled", true );
             $('#leavetype').attr('disabled', true);
                 }else{
                  //alert("opted");
                   $("#noofdayslabel").show();
                 }
           
            },
            error:function(data,textStatus,jqXHR){

            },

      });
}
  
Validation(){

   $("#submitLeaveReq").attr("disabled","true");
  $("#fromDate,#toDate,#leavetype,#subject,#reason").keyup(function(){
      if($("#fromDate").val() && $("#toDate").val() && $("#leavetype").val() && $("#subject").val() && $("#reason").val())
          $("#submitLeaveReq").removeAttr("disabled");
  });
}

Validation1(){
  alert("validation");
  $( "#toDate" ).datepicker( "option", "disabled", true );
  $("#leavetype").attr("disabled","true");
var fromDate=$("#fromDate").datepicker();
var toDate=$("#toDate").datepicker();
 

     
}

GetLeaveType(){
  var leaveDropdown;
var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
            var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
       
       this.state.companyId=companyId;
       this.state.employeeId=employeeId;  

this.setState({
companyId:this.state.companyId,
employeeId:this.state.employeeId,
});

alert("json data"+JSON.stringify(this.state));
 $.ajax({ 
                type: 'POST',
               data:JSON.stringify({ companyId:this.state.companyId,
    employeeId:this.state.employeeId,
    }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/getleavetype",
                contentType: "application/json",
                dataType: 'json',
                async:false,
                success: function(data,textStatus,jqXHR)
                {
                  alert("success");
                  console.log(data);
  $.each(data.leaveTypeList, function (i,item) {
               
             leaveDropdown += '<option>' + item.leaveType + '</option>' ;
    
     });
            $("#leavetype").append(leaveDropdown);
           
 },
  error:  function(data,textStatus,jqXHR)
                {
                    confirmAlert({
                        title: 'Server Error',                        // Title dialog
                        message: 'Server Error Try Again Later',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                  
                        
                         });                
                                          
                }, 
});


}





AddFunc(){
  this.state.employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)           
this.state.companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 
 alert(JSON.stringify(this.state));

                  var self=this;
                $.ajax({
                type: 'POST',
               data:JSON.stringify({
                 fromDate:this.state.fromDate,
                  toDate:this.state.toDate,
                  reason:this.state.reason,
                  subject:this.state.subject,
                 noOfDays: this.state.noOfDays,
                 employeeId:this.state.employeeId,
                companyId:this.state.companyId,
                reportingManagerId:this.state.reportingManagerId,
                day:this.state.day, 
                leaveType:this.state.leaveType,
 }),
                url:"http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                { confirmAlert({
                    title: 'Sucess',                        // Title dialog
                    message: 'Request for Attendance Regularization Sent Successfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                        })

                  ReactDOM.render(
      <Router>
        <div>
        
           <Route path="/" component={EmployeeMenuHeader}/>
           <Route  path="/" component={LeaveManagement}/>
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
         
              },
              error: function(data,jqXHR){
                confirmAlert({
                title: 'Server Error',                        // Title dialog
                message: 'Server Error Try Again Later',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
                                          
                
                 }); 
              }

  });
           
}

    render() {

        return (


            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">
                    <h3>Leave Form</h3>

                    <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                 <form id="fromDatelabel" style={{ paddingBottom: '20px', position: 'inline-block'}} >
                       

                                <label htmlFor="fromDate" style={{ paddingRight: '53px'}}> From:</label>
                                <input
                                    style={{ width: '20%' }}
                                    type="text"
                                    value={this.state.fromDate}
                                    id="fromDate" name="fromDate"
                                    onChange={this.handleUserInput} />
 </form>

<form id="toDatelabel" style={{ paddingBottom: '20px', position: 'inline-block' }}   >
                                <label
                                    htmlFor="toDate"
                                    style={{ paddingRight: '70px' }}> To:</label>

                                <input
                                    style={{ width: '20%' }}
                                    type="text"
                                    value={this.state.toDate}
                                    id="toDate" name="toDate"
                                    onSelect={this.handleUserInput} />


</form >


      <form id="leavetypelabel"  style={{ paddingBottom: '20px', position: 'inline-block'}}   >
                                <label
                                    htmlFor="leavetype"
                                    style={{ paddingRight: '30px' }}>LeaveType:</label>

                                <select style={{width:'198px'}} name="leaveType" id="leavetype"  onChange={this.handleUserInputLeaveType}
          value={this.state.leaveType} required>
                  <option value="" >Select leave type</option>
               
                  
                </select>


        </form >

 <form id="noofdayslabel" value="noofdays" style={{ paddingBottom: '20px', position: 'inline-block' }}>
                 <label for="noOfDays" style={{ paddingRight: '20px' }}>
                                No of days:
            </label>

                          
                                <input type=""
                                style={{ width: '20%' }}
                                    value={this.state.noOfDays}
                                    id="noOfDays"
                                    name="noOfDays" readonly="readonly"
                                />
                           
  </form>

  <form id="subjectlabel" > 
                 
                         <label for="subject" >
                        Subject:
</label>
                        <div >
                        <textarea 
                            onClick={this.handleUserInput}  onChange={this.handleUserInput}
                            name="subject"
                            id="subject"
                            maxlength="75"
                            placeholder="Your reason.." required style={{ height: '150px',width: '50%'  }} ></textarea>
                             </div>
   </form>

    <form id="reasonlabel" > 
  
                        <label for="reason" >
                        Reason:
        </label>

                    <div >
                        <textarea 
                            onChange={this.handleUserInput}
                            name="reason"
                            id="reason"
                            maxlength="250"
                            placeholder="Your reason.." required style={{ height: '150px',width: '50%'  }}></textarea>
                    </div>

                    </form>
                   

                        <button type="button" id="submitLeaveReq" onClick={() => this.AddFunc()} class="btn btn-info">Submit</button>

                    </form>

                </div>
</div>

    );
  }
}
export default MoreThanOneDay;
