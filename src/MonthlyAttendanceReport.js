
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './LoginPage.css';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js' ;
import MonthlyAttendanceReportDisplay from './MonthlyAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css




class MonthlyAttendanceReport extends Component{


  constructor(props) {
    super(props)
        this.state = {
       date:'',    
       companyId:'',   
        }

  }

      
  MonthlyFunc(value){
        var today= new Date();
        this.state.date=today.getFullYear() + '-'+value+'-'+'01';
        /*alert(this.state.date);
        */var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId=companyId;
		this.setState({
			companyId:companyId,
        });
        
           /*  alert(JSON.stringify(this.state));
           */  $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeAttendanceMonthlyReport",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                    {
                     console.log(data);
                       alert("Monthly Report");
                       ReactDOM.render(
      <Router>
        <div>
        
           <Route path="/" component={EmployeeMenuHeader}/>
           <Route  path="/" component={() => <MonthlyAttendanceReportDisplay data={data}/>}/>
           
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
    

                       
},
                    error:function(data) {
                         /*console.log('#####################error:################################'+data);
                         */ confirmAlert({
                        title: 'Server Error',                        // Title dialog
                        message: 'Server Error Try Again Later',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                  
                        
                         });                
                            
       
                    },
                    });


  }
  BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
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
<h2>Monthly Report</h2>

  <div class="btn-group" style={{marginBottom:"120%"}}>
    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select your Month</button>
    
      
    
    <ul class="dropdown-menu" style={{paddingLeft: "37px",MarginBottom:"40%"}} role="menu">
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("01")}>January</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("02")}>Feburuary</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("03")}>March </a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("04")}>April </a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("05")}>May</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("06")}>June</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("07")}>July</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("08")}>August</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("09")}>September</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("10")}>october</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("11")}>November</a></li>
      <li><a href="#" onClick={(e)=>this.MonthlyFunc("12")}>December</a></li>
      
    </ul>
  </div>
  
</div>

    


    

   
        
  
    );
  }

}
export default MonthlyAttendanceReport;


{/* <div className                     = "container-fluid" id = "rowid" style     = {{backgroundColor:            'white'}}>
  
 
 <div className                    = "row"  id            = "menupageid"style = {{backgroundColor:            'white'}}>
 
        <div className             = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {(e)             => this.MonthlyFunc("01")}  id = "jancolstyle" className = "" >January</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("02")} id  = "febcolstyle" className = "" >Feburuary</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("03")} id  = "marcolstyle" className = "" >March</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("04")} id  = "aprcolstyle" className = "" >Aprill</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("05")} id  = "maycolstyle" className = "" >May</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("06")} id  = "juncolstyle" className = "" >June</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("07")} id  = "julcolstyle" className = "" >July</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("08")} id  = "augcolstyle" className = "" >August</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("09")} id  = "sepcolstyle" className = "" >September</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("10")} id  = "octcolstyle" className = "" >october</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("11")} id  = "novcolstyle" className = "" >November</a>
                    </div>
                    <div className = "col-xs-6" id        = "colstyle">
                <a  to             = "/" onClick          = {()              => this.MonthlyFunc("12")} id  = "deccolstyle" className = "" >December</a>
                    </div>
                
                
                
                        
                        </div>
            </div>
 */}
