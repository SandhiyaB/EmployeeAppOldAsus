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
import CryptoJS from 'crypto-js' ;
import registerServiceWorker from './registerServiceWorker';
import MonthlyOrganizationAttendanceReportDisplay from './MonthlyOrganizationAttendanceReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import MonthlyIndividualAttendanceReport from './MonthlyIndividualAttendanceReport';





class MonthlyOrganizationAttendanceReport extends Component{


  constructor(props) {
    super(props)
        this.state = {
       date:'',    
       companyId:'',
       employeeId:'',   
        }


  }

      
  MonthlyFunc(value){
        var today= new Date();
        this.state.date=today.getFullYear() + '-'+value+'-'+'01';
      var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

  this.state.companyId=companyId;
  this.state.employeeId=employeeId;

     
            this.setState({
              date:this.state.date,
              companyId:this.state.companyId,
              employeeId:this.state.employeeId,

            });

       $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeOrganizationAttendanceMonthlyReport",
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
        
           
           <Route  path="/" component={() => <MonthlyOrganizationAttendanceReportDisplay data={data}/>}/>
           
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();
    

                       
},
                    error:function(data) {
                         /*console.log('#####################error:################################'+data);
                         */
       
                    },
                    });


  }
  MyReport(){
            //window.location.reload();


    
 
           ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <MonthlyIndividualAttendanceReport />}/>
           
          
                 </div>
                  </Router>,
                      document.getElementById('root'));
                      registerServiceWorker();

                              }

     OrganizationReport()
{
  ReactDOM.render(
      <Router>
        <div>
        
           
           <Route  path="/" component={() => <MonthlyOrganizationAttendanceReport />}/>
           
          
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

<h2 className="centerAlign" style={{textAlign:"center"}}>Organization Monthly Report</h2>
 <div id='horMenu'>
    <ul>
  <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.MyReport()}><span className="glyphicon glyphicon-user">My Report</span></a></li>
  <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={()=>this.OrganizationReport()}><span className="glyphicon glyphicon-th-large">Organization Report
  </span></a></li>
 </ul>
 </div>
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
export default MonthlyOrganizationAttendanceReport;