import React,{Component} from 'react';
//import LoginPage from './LoginPage';
//import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CryptoJS from 'crypto-js' ;
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';


class LeaveType extends Component {


constructor() {

	var today = new Date();
    var displayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        super()
        this.state = {
			date:date,
			leaveType:'',
			noofLeave:'',
      companyId:'',
      leaveTypeEdited:'None',
        };
    }
    
componentDidMount(){

var self=this;
var  tab ;

 $('#datepicker').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            self.setState({
        date:date,
       // dateValid:true,
       });
        
     },
     
     dateFormat: 'yy-mm-dd',
     minDate: '-3M', 
     maxDate: '-1D',
    numberOfMonths:1 } );


 $("#leavetabledata").on('click',"#delete",function(){
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
 self.state.companyId=companyId;
  
         var currentRow=$(this).closest("tr"); 

        self.state.date=currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
         self.state.description=currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
          
          self.setState({
      date:self.state.date,
      //description:self.state.description,
     companyId:self.state.companyId,
     
  });
          
alert(JSON.stringify(self.state));
$(this).closest('tr').remove(); 
self.Delete();
})

 $("#leavetabledata").on('click',"#update",function(){
  
         var currentRow=$(this).closest("tr"); 

        
var updateLeaveType=currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateNoOfLeave=currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      
$("#leavetype").val(updateLeaveType);
$("#noofleave").val(updateNoOfLeave);
$("#editleavetype").show();

 self.state.leaveType=updateLeaveType;
  self.state.noofLeave=updateNoOfLeave;

self.setState({
  leaveType:self.state.leaveType,
  noofLeave:self.state.noofLeave,
 leaveTypeEdited:self.state.leaveTypeEdited
})

$(this).closest('tr').remove(); 
$('#addrow').hide();
$('#updaterow').show();

})

 $("#editleavetype").click(function(){
$('#LeaveTypeEdited').show();


});
 self.GetData();

}

handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value.toLowerCase().replace(/\s/gi,""),
           
        });

      }
 
 GetData(){
      var  tab ;
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 alert(companyId);
      this.state.companyId=companyId;
alert(JSON.stringify(this.state));
      this.setState({
           companyId:this.state.companyId,
    });  

alert("Ajax call 1"+JSON.stringify(this.state));
                  
                $.ajax({
                type: 'POST',
               data:JSON.stringify(this.state),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/getleaveinfodata",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 
                  console.log(data);
   $.each(data.holidayDatalist, function (i,item) {
               
             tab += '<tr><td>' + item.leaveType + '</td><td>' + item.days+ '</td><td ><button id="delete">'+"Delete"+'</button><button id="update">'+"Update"+'</button></td></tr>';
    
     });
            $("#leavetabledata").append(tab);
                      
              },

 error:  function(data,textStatus,jqXHR)
                {
                          alert("error");  
                                                           
                },  

                 });
//})

    }

AddRow(){
	alert("add row");
	 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
  this.state.companyId=companyId;

alert(JSON.stringify(this.state));
      this.setState({
         date:this.state.date,
    leaveType:this.state.leaveType,
    noofLeave:this.state.noofLeave,
    companyId:this.state.companyId,
    });   
 alert("Ajax call2"+JSON.stringify(this.state));
                  var self=this;
                $.ajax({
                type: 'POST',
               data:JSON.stringify({
                date:this.state.date,
                companyId:this.state.companyId,
                leaveType:this.state.leaveType,
                noofLeave:this.state.noofLeave,
              }),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/addLeaveinfo",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                	console.log(data);
                  alert("success"); 
                  if(data.description=="New"){
                     $("#leavetabledata").append("<tr><td>"+$("#leavetype" ).val()+"</td><td>"+$("#noofleave").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
   
                  }else{
                    alert("Data Already Exist choose update option");
                  }
                  $("#leavetype").val("");
                  $("#noofleave").val("");
             },

 error:  function(data,textStatus,jqXHR)
                {
                          alert("error");  
                         
                         
                },  

  });

}
 UpdateRow(){
         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
  this.state.companyId=companyId;

alert(JSON.stringify(this.state));
      this.setState({
         date:this.state.date,
    noofleave:this.state.noofleave,
    companyId:this.state.companyId,
    leavetype:this.state.leavetype,
    leaveTypeEdited:this.state.leaveTypeEdited,
    });    
  alert("Ajax call"+JSON.stringify(this.state));
                  var self=this;
                $.ajax({
                type: 'POST',
               data:JSON.stringify(this.state),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/updateleaveinfo",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 
                  
                     $("#leavetabledata").append("<tr><td>"+$("#leavetype" ).val()+"</td><td>"+$("#noofleave").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
   
                 
                  $("#leavetype").val("");
                  $("#noofleave").val("");
$('#addrow').show();
$('#updaterow').hide();
             },

 error:  function(data,textStatus,jqXHR)
                {
                          alert("error");  
                         
                         
                },  

  });


    }

Delete(){
alert("Ajax call"+JSON.stringify(this.state));
                  
                $.ajax({
                type: 'POST',
               data:JSON.stringify(this.state),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/deleteholidayinfo",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 

                  $("#datepicker").val("");
                  $("#description").val("");
                },

 error:  function(data,textStatus,jqXHR)
                {
                          alert("error");                              
                },  
 
                 });
//})

    }


LeaveFunc(){
alert("LeaveFunc");

ReactDOM.render(
        <Router>
          <div>           
                 <Route path="/" component={EmployeeMenuHeader}/>
                 <Route path="/" component={LeaveType}/>
                 
                         </div>
                              </Router>,
                                        document.getElementById('root'));
                                        registerServiceWorker();

 }  

HolidayFunc(){
alert("HolidayFunc");

ReactDOM.render(
        <Router>
          <div>           
                 <Route path="/" component={EmployeeMenuHeader}/>
                 <Route path="/" component={HolidayConfig}/>
                 
                         </div>
                              </Router>,
                                        document.getElementById('root'));
                                        registerServiceWorker();

}


                                   
        
 
  render() {
 	
            return (
  <div className="container" style={{ marginBottom: '30%' }}>
  <div class="jumbotron">


<form id="dateformat">

<li><a className="active" onClick={()=>this.LeaveFunc()}><span class="glyphicon glyphicon-ok">Leave</span></a></li>
  <li><a onClick={()=>this.HolidayFunc()}><span class="glyphicon glyphicon-time">Holiday</span></a></li>

</form>
<br />
<br />
 <form id="LeaveType" style={{ paddingRight: '30px' ,marginRight: '0px'}}>

       <label
          htmlFor="leavetype"
          style={{ paddingRight: '30px' , marginLeft: '0px'}}>LeaveType:</label>

        <input
       style={{ width: '35%'}}
       type="text"
        value={this.state.leaveType}
        id="leavetype" 
        name="leaveType"
         onChange={this.handleUserInput}/>

<button type="button" id="editleavetype" style={{display:"none"}} class="btn btn-info">Edit</button>

<form id="LeaveTypeEdited" style={{display:"none" }} >

       <label
          htmlFor="leavetypeedited"
          style={{ paddingRight: '30px' }}>New Leave Type Name:</label>

        <input
       style={{ width: '35%'}}
       type="text"
        value={this.state.leaveTypeEdited}
        id="leavetypeedited" 
        name="leaveTypeEdited"
         onChange={this.handleUserInput}  />

    </form>


    </form>

    <form id="NoOfLeave">

       <label
          htmlFor="noofleave"
          style={{ paddingRight: '30px' }}>NoOfLeave:</label>

        <input
       style={{ width: '35%'}}
       type="text"
        value={this.state.noofLeave}
        id="noofleave" 
        name="noofLeave"
         onChange={this.handleUserInput}/>

    </form>

    

     <button type="button" id="addrow" onClick={() => this.AddRow()} class="btn btn-info">Add</button>

 <button type="button" id="updaterow" onClick={() => this.UpdateRow()}  style={{display:"none"}} class="btn btn-info">Update</button>


<table id="leavetabledata">
<tr><th>LeaveType</th><th>No.Of.Days</th><th>Action</th></tr>
</table>

  </div>
</div>
            	);
  }

}
export default LeaveType;
