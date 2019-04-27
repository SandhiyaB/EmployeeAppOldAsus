import React,{Component} from 'react';
//import LoginPage from './LoginPage';
//import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CryptoJS from 'crypto-js' ;

class HolidayConfig extends Component {

constructor() {
        super()
        this.state = {
			date:'',
			description:'',
      companyId:'',
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

        
var updateDate=currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateDescription=currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      
$("#datepicker").val(updateDate);
$("#description").val(updateDescription);
 self.state.date=updateDate;
  self.state.description=updateDescription;
self.setState({
  date:self.state.date,
  description:self.state.description,
 
})

$(this).closest('tr').remove(); 
$('#addrow').hide();
$('#updaterow').show();

})

 self.GetData();
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
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/getholidayinfodata",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 
                  console.log(data);
   $.each(data.holidayDatalist, function (i,item) {
               
             tab += '<tr><td>' + item.date + '</td><td>' + item.description+ '</td><td ><button id="delete">'+"Delete"+'</button><button id="update">'+"Update"+'</button></td></tr>';
    
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
      alert("adding row");

     // $("#leavetabledata").append("<tr><td>"+$("#datepicker" ).val()+"</td><td>"+$("#description").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
     var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
    this.state.companyId=companyId;
alert(JSON.stringify(this.state));
      this.setState({
         date:this.state.date,
    description:this.state.description,
    companyId:this.state.companyId,
    });    
  alert("Ajax call2"+JSON.stringify(this.state));
                  var self=this;
                $.ajax({
                type: 'POST',
               data:JSON.stringify(this.state),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/addholidayinfo",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 
                  if(data.description=="New"){
                     $("#leavetabledata").append("<tr><td>"+$("#datepicker" ).val()+"</td><td>"+$("#description").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
   
                  }else{
                    alert("Date Already Exist choose update option");
                  }
                  $("#datepicker").val("");
$("#description").val("");
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
    description:this.state.description,
    companyId:this.state.companyId,
    });    
  alert("Ajax call"+JSON.stringify(this.state));
                  var self=this;
                $.ajax({
                type: 'POST',
               data:JSON.stringify(this.state),
                url: "http://localhost:8080/EmployeeAttendenceAPI/employee/updateholidayinfo",
                contentType: "application/json",
                dataType: 'json',
                success: function(data,textStatus,jqXHR)
                {
                  alert("success"); 
                  
                     $("#leavetabledata").append("<tr><td>"+$("#datepicker" ).val()+"</td><td>"+$("#description").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
   
                 
                  $("#datepicker").val("");
                  $("#description").val("");
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

   
    render() {
 	
            return (
  <div className="container" style={{ marginBottom: '30%' }}>
  <div class="jumbotron">


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

    <form id="Description">

       <label
          htmlFor="description"
          style={{ paddingRight: '30px' }}>Description:</label>

        <input
       style={{ width: '35%'}}
       type="text"
        value={this.state.description}
        id="description" 
        name="description"
         onChange={this.handleUserInput}/>

    </form>

     <button type="button" id="addrow" onClick={() => this.AddRow()} class="btn btn-info">Add</button>

 <button type="button" id="updaterow" onClick={() => this.UpdateRow()}  style={{display:"none"}} class="btn btn-info">Update</button>

<table id="leavetabledata">
<tr><th>Date</th><th>Description</th><th>Action</th></tr>
</table>

 
               </div>
</div>
            	);
  }

}
export default HolidayConfig;
