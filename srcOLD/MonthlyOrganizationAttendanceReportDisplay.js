import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import MonthlyOrganizationAttendanceReport from './MonthlyOrganizationAttendanceReport';
import registerServiceWorker from './registerServiceWorker';

class MonthlyOrganizationAttendanceReportDisplay extends Component{


  constructor(data) {
    super(data)

    var today = new Date();
    today= today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear() ;
        this.state = {
             date:today,
       

            };
    }
    componentDidMount() {
     /* alert('componentDidMount');
     */ 
             var tab='<thead><tr class="headcolor"><th>Date</th><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut </th><th>Duration</th><th>Status</th><th>Type</th></tr></thead>';
                  
                  
             $.each(this.props.data.employeeRetrievelist, function (i, item) {
               /* alert(item);
               */ tab += '<tr class="success" ><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>'  + item.checkinTime +'</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + item.status + '</td><td>' + item.employeeType +'</td></tr>';
            });
            $("#tableHeadings").append(tab);
            var summary='<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Hour</th></tr></thead>';
             $.each(this.props.data.employeeCountRetrievelist, function (i, item) {
               /* alert(item);
             */summary += '<tr class="success" ><td>' + item.employeeId + '</td><td>'+item.employeeName+ '</td><td>' +item.noOfDaysPresent+ '</td><td>'  +item.noOfDaysAbsent+'</td><td>'+item.totalWorkHour+ '</td></tr>';
             });
  
                  
            $("#summary").append(summary);


           }

 BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     
                     <Route path="/" component={MonthlyOrganizationAttendanceReport}/>
                     
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

 <h3 className="centerAlign" style={{textAlign:"center"}}>Monthly Attendance Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}></h4>
   
          <div id="tableOverflow">
        <table class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
         <div id="tableOverflow">
        <h3 className="centerAlign" style={{textAlign:"center"}}>Summary</h3>
 
        <table class="table" id="summary" style={{marginBottom:"20%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default MonthlyOrganizationAttendanceReportDisplay;