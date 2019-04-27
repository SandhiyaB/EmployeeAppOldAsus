
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';

import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import NoSearchResult from './NoSearchResult';
import EmployeeMenuPage from './EmployeeMenuPage';


import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import './Maintenance.css';
import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import DepartmentAddRemove from './DepartmentAddRemove';
import RoleAddRemove from './RoleAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import CryptoJS from 'crypto-js' ;

class Maintenance extends Component{

	constructor() {
        super()
        this.state = {

			search:'',
			companyId:'',

			
			    }
}
				handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  );
			}

			

EmployeeFunc(){
	/*alert(" Maintenance page");
	*/ReactDOM.render(
			<Router>
			  <div>			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					
					 <Route  path="/" component={EmployeeAddRemUpdMenu}/>
					 		 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
										}		

RemoveFunc(){
	ReactDOM.render(
			<Router>
			  <div>			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route path="/" component={Maintenance}/>
					 <Route  path="/" component={RemoveEmployee}/>
					 		 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
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
						url: "http://localhost:8080/EmployeeAttendenceAPI/employee/searchemployee",
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
								 <Route path="/" component={Maintenance}/>
								 <Route  path="/" component={() => <SearchEmployee data={data} />}/>
								 		 </div>
											  </Router>,
								
													document.getElementById('root'));
													registerServiceWorker();
														
								}else{
									ReactDOM.render(
						<Router>
						  <div>			  
								 <Route path="/" component={EmployeeMenuHeader}/>
								 <Route path="/" component={Maintenance}/>
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

DepartmentFunc(){
                                        ReactDOM.render(
                                                <Router >
                                                <div>
                                                <Route path="/" component={EmployeeMenuHeader}/>
                                                <Route path="/" component={DepartmentAddRemove}/>                        
                                                <Route path="/" component={AddNewDepartment}/>
                                                                                                                        
                                                    </div>
                                                </Router>, document.getElementById('root'));
            
                                    }
RoleFunc(){
                                        ReactDOM.render(
                                            <Router >
                                            <div>
                                            <Route path="/" component={EmployeeMenuHeader}/>
                                            <Route path="/" component={RoleAddRemove}/>                                  
                                            <Route path="/" component={AddNewRole}/>

                                                                                                                    
                                                </div>
                                            </Router>, document.getElementById('root'));
                                                                    
}

	
										

UpdateFunc(){
	ReactDOM.render(
			<Router>
			  <div>			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route path="/" component={Maintenance}/>
					 <Route  path="/" component={UpdateEmployee}/>
					 		 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
										}	

										BackbtnFunc(){
											ReactDOM.render(
													<Router>
													  <div>           
															 <Route path="/" component={EmployeeMenuHeader}/>
															 <Route path="/" component={EmployeeMenuPage}/>
															 
																	 </div>
																		  </Router>,
																					document.getElementById('root'));
																					registerServiceWorker();
																				}   
										
										


render(){
		return(
			

			
	<div className="container" style={{marginBottom:"20%"}}>
	
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
  			<h4>Employees </h4>
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

<div id='horMenu'>
    <ul>
  <li><a className="active" onClick={()=>this.EmployeeFunc()}><span class="glyphicon glyphicon-user">Employee</span></a></li>
  <li><a onClick={()=>this.DepartmentFunc()}><span class="glyphicon glyphicon-th-large">Department    </span></a></li>
  <li><a onClick={()=>this.RoleFunc()}><span class="glyphicon glyphicon-pushpin">Role</span></a></li>
</ul>

</div>


 {/*<div className="btn-group btn-group-justified"  style={{float:"none"}}>
 

  	 <div class="btn-group active">

    <button type="button"  onClick={()=>this.AddEmployeeFunc()} class="btn btn-info"><span class="glyphicon glyphicon-plus">Employee</span></button>

  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-danger" onClick={()=>this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-success"onClick={()=>this.UpdateFunc()}><span class="glyphicon glyphicon-refresh">Update</span></button>
  </div>

  </div>*/}


 
</div>

	
				
			
		);
	}

}


export default Maintenance;

/* /*style={{fontSize: "larger",paddingTop:"12px"}}

 <div  className="col-xs-5" style={{paddingBottom:"10px"}}>
 	  <div class="input-group add-on">
      <input class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text"/>
      <div class="input-group-btn">

 	  <button class="btn btn-default" type="submit"onClick={()=>this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
  		</div>
  		</div>

			</div> */
