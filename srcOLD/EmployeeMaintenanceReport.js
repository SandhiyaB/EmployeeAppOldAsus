
import React,{Component} from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js' ;
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

class EmployeeMaintenanceReport extends Component{


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
             var tab='<thead><tr class="headcolor"><th>Id</th><th>FirstName</th><th>LastName</th><th>Role</th><th>Dept</th><th>Type</th><th>MobileNo</th></tr></thead>';
                  
                  
             $.each(this.props.data.employeeRetrievelist, function (i,item) {
               /* alert(item);
               */ tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.firstName + '</td><td>' + item.lastName + '</td><td>'  + item.role +'</td><td>' + item.department + '</td><td>' + item.employeeType + '</td><td>' + item.mobileNo + '</td></tr>';});
            $("#tableHeadings").append(tab);
            

var summary='<thead><tr class="headcolor"><th>Type</th><th>#Employee</th></thead>';
             summary += '<tr class="success" ><td> Permanent</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfPermanentEmployee;
             summary += '<tr class="success" ><td> Contract</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfContractEmployee ;
             summary += '<tr class="success" ><td> Temporary</td><td>' + this.props.data.employeeCountRetrievelist[0].noOfTemporaryEmployee ;
               
                  
            $("#summary").append(summary);

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

 
 <h3 className="centerAlign" style={{textAlign:"center"}}> Employee Maintenance Report</h3>
   
          <div id="tableOverflow">
        <table style={{margin:"auto"}}class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
        <div id="tableOverflow">
        <table  class="table" id="summary" style={{marginBottom:"30%"}}>
        
      
         </table>
         
        </div>
   
        
 </div>
    );
  }

}
  
export default EmployeeMaintenanceReport;
