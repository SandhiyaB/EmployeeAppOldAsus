import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js' ;
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import registerServiceWorker from './registerServiceWorker';
import SearchAudit from './SearchAudit';
import Maintenance from './Maintenance';
import NoSearchResult from './NoSearchResult';


class AuditReport extends Component{


  constructor(data) {
    super(data)

    var today = new Date();
    today= today.getFullYear() + '-'+ (today.getMonth() + 1) +'-'+ today.getDate();
    
       
        this.state = {
             date:today,
       

            };
    }
    handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  );
			}
			SearchFunc(){
	


			/* alert(JSON.stringify(this.state));
			*/ var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
			 this.state.companyId=companyId;
			 this.setState({
				 companyId:companyId,
			 });
			 $.ajax({
						type: 'POST',
						data:JSON.stringify(this.state),
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/auditsearchemployee",
						contentType: "application/json",
						dataType: 'json',
						async:false,
						success: function(data,textStatus,jqXHR)
						        {
						 			/*console.log(data);

									alert(data);
									*/if(data.length){
									ReactDOM.render(
						<Router>
						  <div>			  
								 <Route path="/" component={EmployeeMenuHeader}/>
								 
								 <Route  path="/" component={() => <SearchAudit data={data} />}/>
								 		 </div>
											  </Router>,
								
													document.getElementById('root'));
													registerServiceWorker();
														
								}else{
									ReactDOM.render(
						<Router>
						  <div>			  
								 <Route path="/" component={EmployeeMenuHeader}/>
								 
								 <Route  path="/" component={NoSearchResult} />								 		 </div>
											  </Router>,
								
													document.getElementById('root'));
													registerServiceWorker();
									
								}						
						 			},
						error:function(data) {
						        /* console.log('#####################error:################################'+data);
						        */confirmAlert({
									title: 'Server Error',                        // Title dialog
									message: 'Server Error Try Again Later',               // Message dialog
									confirmLabel: 'Ok',                           // Text button confirm
															  
									
									 });                
										
       
						},
				});

		}

    componentDidMount() {
      /*alert('componentDidMount');
      */
             var tab='<thead><tr class="headcolor"><th>SuperiorId</th><th>Name</th><th>Role</th><th>Operation</th><th>EmployeeId</th><th>Date</th><th>Time</th></tr></thead>';
                  
                  
             $.each(this.props.data.employeeRetrievelist, function (i,item) {
               /* alert(item);
               */ tab += '<tr class="success" ><td>' + item.superiorId + '</td><td>' + item.name + '</td><td>' + item.role + '</td><td>'+ item.operation + '</td><td>' + item.employeeId + '</td><td>' + item.date + '</td><td>'+item.time+'</td></tr>';
            });
            $("#tableHeadings").append(tab);
           


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

 <div className="row" id="Employeemenu" >
		<div id="Employeesearchtab " className="col-xs-7">
  			<h3></h3>
  				</div>
 	 <div  className="col-xs-5" style={{paddingBottom:"10px"}}>
 	  <div class="input-group add-on">
 	   <input 
      					 type="text" 
      					 value={this.state.search} 
      					 class="form-control"
      					 placeholder="Search"
      					 onChange={this.handleUserInput} 
      					 name="search" 
      					 id="srch-term"
      					  />
      <div class="input-group-btn">

 	  <button class="btn btn-default" id="searchbtn"type="submit"onClick={()=>this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
  		</div>
  		</div>

			</div>
			</div>

 <h3 className="centerAlign" style={{textAlign:"center"}}>Audit Report</h3>
  <h4 className="centerAlign" style={{textAlign:"center"}}>{this.state.date}</h4>
   
          <div id="tableOverflow" style={{marginBottom:"20%"}} >
        <table style={{margin:"auto"}}class="table" id="tableHeadings">
        
      
         </table>
         
        </div>
         
   
        
 </div>
    );
  }

}
  
export default AuditReport;

