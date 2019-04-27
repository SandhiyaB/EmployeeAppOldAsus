import React, { Component } from 'react';
import {
    FormErrors
} from './FormErrors';
import logo from './logo.svg';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import DatePicker from 'react-date-picker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import './datepicker.css';
import CryptoJS from 'crypto-js' ;
import EmployeeMenuPage from './EmployeeMenuPage';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';




class OneDay extends Component {

constructor(props) {
  var leaveDays;

    super(props)
         //var today = new Date();
       // var date= today.getFullYear() + '-' + (today.getMonth() + 1) +'-' +today.getDate();
        this.state = {
           
            noOfDays:'0',
            reason:'',
            subject:'',
            day:'oneday',
            date:'',
            employeeId:'',
            reportingManagerId:'',
            companyId:'',
            leaveType:'',
            session:'',
            
               
        }
    }

componentDidMount() {
  var self=this;
     $('#datepicker').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            self.setState({
        date:date,
        dateValid:true,
       });
        
     },
     
     dateFormat: 'yy/mm/dd',
     minDate: '-3M', 
     maxDate: '-1D',
    numberOfMonths:1 } );

    self.Validation()

     self.GetLeaveType();
    
}

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
           
        });
      }


  handleUserInputDate = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value,
        dateValid:true});

  }

onChange = date1 => this.setState({ date1 })

       oneDayDuration = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
           
        });
        if(value!="full day")
        {
          this.setState({
             noOfDays:'0.5',
             session:value,
            });
        }else{
 this.setState({
             noOfDays:'1',
             session:'1 Day',
            });
}

$('#leavetype').attr('disabled', false);
      }

      handleUserInputLeaveType = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.state.leaveType=value;
        this.setState({
            [name]: value,
           
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
                    self.state.leaveType="";
                    self.setState({
                    leaveType: self.state.leaveType,
                    });
                    
                    $("#duration").prepend("<option value='' disabled selected hidden selected='selected'>Select leave duration </option>");
               $('leavetype option[text="Select leave type"]').attr('selected','selected');
                $('#leavetype').attr('disabled', true);
                 }   /*else{
                  alert("opted");
                 }
                          */
            },
            error:function(data,textStatus,jqXHR){

            },

      });
}
  
Validation(){

   $("#submitLeaveReq").attr("disabled","true");
  $("#datepicker, #duration, #leavetype,#subject,#reason").keyup(function(){
      if($("#datepicker").val() && $("#duration").val() && $("#leavetype").val() && $("#subject").val() && $("#reason").val())
          $("#submitLeaveReq").removeAttr("disabled");
  });
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
             alert("adding leave request" +JSON.stringify(this.state));
                  var self=this;
                $.ajax({ 
                type: 'POST',
               data:JSON.stringify({ reason:this.state.reason,
    subject:this.state.subject,
   noOfDays: this.state.noOfDays,
   employeeId:this.state.employeeId,
  companyId:this.state.companyId,
  day:this.state.day,       
  date:this.state.date,
  leaveType:this.state.leaveType,
  
  }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
                contentType: "application/json",
                dataType: 'json',
                async:false,
                success: function(data,textStatus,jqXHR)
                {
                    confirmAlert({
                    title: 'Sucess',                        // Title dialog
                    message: 'Leave Request Sent Successfully', // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                        })

                   $('#Duration').val("");
                   $('#noOfDays').val("");
                    $('#subject').val("");
                     $('#reason').val("");  

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


    render() {
            return (

      <div className="container" style={{ marginBottom: '30%' }}>
  <div class="jumbotron">
   <h3>Leave Form</h3>
          <form id="oneday" style={{ paddingBottom: '20px', position: 'inline-block' }}>
    
    <form id="dateformat">
       <label
          htmlFor="datepicker"
          style={{ paddingRight: '30px' }}>Date:</label>

        <input
       style={{ width: '35%'}}
       type="text"
        value={this.state.date} 
        id="datepicker" 
        name="date"
         onChange={this.handleUserInputDate}/>

    </form>
       <form id="durationlabel"  style={{ paddingBottom: '20px', position: 'inline-block'}}   >
                                <label
                                    htmlFor="duration"
                                    style={{ paddingRight: '30px' }}>Duration:</label>

                                <select style={{width:'198px'}} name="duration" id="duration" onChange={this.oneDayDuration}
          value={this.state.constraint} required>
                  <option value="" disabled selected hidden>Select leave duration</option>
                  <option value="first half">First Half</option>
                  <option value="second half">Second Half</option>
                  <option value="full day">full day</option>
                  
                </select>


        </form >


 <form id="leavetypelabel"  style={{ paddingBottom: '20px', position: 'inline-block'}}   >
                                <label
                                    htmlFor="leavetype"
                                    style={{ paddingRight: '30px' }}>LeaveType:</label>

                                <select style={{width:'198px'}} name="leaveType" id="leavetype" disabled onChange={this.handleUserInputLeaveType}
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
                            onChange={this.handleUserInput}
                            name="subject"
                            id="subject"
                            maxlength="75"
                            placeholder="Your reason.." style={{ height: '150px',width: '50%'  }} ></textarea>
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
export default OneDay;

