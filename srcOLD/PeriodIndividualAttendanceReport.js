
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import PeriodIndividualAttendanceReportDisplay from './PeriodIndividualAttendanceReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import CryptoJS from 'crypto-js';
import PeriodOrganizationAttendanceReport from './PeriodOrganizationAttendanceReport';
import { confirmAlert } from 'react-confirm-alert'; 


class PeriodIndividualAttendanceReport extends Component{


  constructor(props) {
    super(props)
        this.state = {
       fromDate:'',
       toDate:'',
       companyId:'',
       employeeId:'',
        }

  }

      handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});

  }
  Submit(){
    /*alert(this.state.fromDate);
    alert(this.state.toDate);
    */
     var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

  this.state.companyId=companyId;
  this.state.employeeId=employeeId;

     
            this.setState({
              companyId:this.state.companyId,
              employeeId:this.state.employeeId,

            });
    
    
             alert(JSON.stringify(this.state));
             $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeIndividualAttendancePeriodReport",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                    {
                       console.log(data);
                       alert("Period Report");
                        ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <PeriodIndividualAttendanceReportDisplay data={data}/>}/>
           
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
    

                       
},
                    error:function(data) {
                        /* console.log('#####################error:################################'+data);
                        */                 
                            
       
                    },
                    });


  }
  
    componentDidMount() {
      var self=this;
    $('#toDate').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            dt.setDate(dt.getDate() - 1);
            $("#fromDate").datepicker("option", "maxDate", dt);
       self.setState({
        toDate:date,
       });
        
     },
     dateFormat: 'yy/mm/dd',
     minDate: '-3M', 
     maxDate: 'M',
    numberOfMonths:1 } );
    $('#fromDate').datepicker({
      onSelect: function(date) {
        var dt = new Date(date);
            dt.setDate(dt.getDate() + 1);
            $("#toDate").datepicker("option", "minDate", dt);
       self.setState({
        fromDate:date,
       });
     },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: 'M', 
      numberOfMonths:1 });  
            
}

MyReport(){
            //window.location.reload();


    
 
           ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <PeriodIndividualAttendanceReport />}/>
           
          
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
        
           
           <Route  path="/" component={() => <PeriodOrganizationAttendanceReport />}/>
           
          import { confirmAlert } from 'react-confirm-alert'; 
          
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
      <div class ="jumbotron">
       <h3 className="centerAlign" style={{textAlign:"center"}}>Period Individual Attendance Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}></h4>
<div id='horMenu'>
    <ul>
  <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.MyReport()}><span className="glyphicon glyphicon-user">My Report</span></a></li>
  <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.OrganizationReport()}><span className="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
 </ul>
 </div>
    <form  style={{ paddingBottom: '50px',  position: 'inline-block'}}>
<label htmlFor="fromDate" style={{ paddingRight: '50px'}}> From:</label>
      <input 
      style={{ width: '46%'}} 
      type="text" 
      value={this.state.fromDate} 
      id="fromDate" name="fromDate"
       onChange={this.handleUserInput}/>

    </form>

    <form  style={{ paddingRight: '50px'}}   >
<label 
htmlFor="toDate" 
style={{ marginRight: '70px'}}> To:</label>

      <input
       style={{ width: '50%'}} 
       type="text" 
        value={this.state.toDate}   
        id="toDate" name="toDate"
         onChange={this.handleUserInput}/>
     
    </form>



    </div>
  
<button 
type="button"
onClick={()=> this.Submit()}
className="btn btn-primary"
 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom:"60px",
 
 display:"block"}}>Submit</button>
   
          <table id="records_table" style={{width:'80%'}}>

           </table>

  </div>
    );
  }

}
export default PeriodIndividualAttendanceReport;
