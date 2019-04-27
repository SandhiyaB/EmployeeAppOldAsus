import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';
import NoSearchResult from './NoSearchResult';

import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Maintenance from './Maintenance';

import CryptoJS from 'crypto-js' ;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class EmployeeAddRemUpdMenu extends Component{

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

componentDidMount(){
    ReactDOM.render(
        <Router>
          <div>           
                 <Route path="/" component={EmployeeMenuHeader}/>
                 <Route path="/" component={EmployeeAddRemUpdMenu}/>
                 <Route  path="/" component={AddEmployee}/>
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
                                       /* console.log(data);
   
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
                                   */ confirmAlert({
                        title: 'Server Error',                        // Title dialog
                        message: 'Server Error Try Again Later',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                  
                        
                         });                
                            
       
                           },
                   });
   
           }
   
   

AddEmployeeFunc(){
    /*alert(" Maintenance page");
    */ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={EmployeeAddRemUpdMenu}/>
                     <Route  path="/" component={AddEmployee}/>
                             </div>
                                  </Router>,
                                            document.getElementById('root'));
                                            registerServiceWorker();
                                        }       

RemoveFunc(){
    var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
			
    this.state.companyId=companyId;
    this.setState({
        companyId:companyId,
    });

			$.ajax({
				type: 'POST',
				data: JSON.stringify({
				  
				  companyId: this.state.companyId,
				  
				}),
				url: "http://localhost:8080/EmployeeAttendenceAPI/employee/EmployeeList",
				contentType: "application/json",
				dataType: 'json',
				async: false,
				crossDomain:true,
		
				success: function(data, textStatus, jqXHR)
		
				{
                    console.log("list",data);
                    ReactDOM.render(
                        <Router>
                          <div>           
                                 <Route path="/" component={EmployeeMenuHeader}/>
                                 <Route path="/" component={EmployeeAddRemUpdMenu}/>
                                 <Route  path="/" component={() =><RemoveEmployee data={data}/>}/>
                                         </div>
                                              </Router>,
                                                        document.getElementById('root'));
                                                        registerServiceWorker();
                                                    }   
            
		});
    
    }

UpdateFunc(){


    var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
			
    this.state.companyId=companyId;
    this.setState({
        companyId:companyId,
    });

			$.ajax({
				type: 'POST',
				data: JSON.stringify({
				  
				  companyId: this.state.companyId,
				  
				}),
				url: "http://localhost:8080/EmployeeAttendenceAPI/employee/EmployeeList",
				contentType: "application/json",
				dataType: 'json',
				async: false,
				crossDomain:true,
		
				success: function(data, textStatus, jqXHR)
		
				{
                    console.log("list",data);
                    ReactDOM.render(
                        <Router>
                          <div>           
                                 <Route path="/" component={EmployeeMenuHeader}/>
                                 <Route path="/" component={EmployeeAddRemUpdMenu}/>
                                 <Route  path="/" component={() =><UpdateEmployee data={data}/>}/>
                                         </div>
                                              </Router>,
                                                        document.getElementById('root'));
                                                        registerServiceWorker();
                                                    }   
            
		});
    
  
 }   

BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={Maintenance}/>
                     
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
  <li><a className="active" onClick={()=>this.AddEmployeeFunc()}><span class="glyphicon glyphicon-plus">Add</span></a></li>
  <li><a onClick={()=>this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </a></li>
  <li><a onClick={()=>this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"> Update</span></a></li>
</ul>

</div>



    </div>
      );
  }
}

export default EmployeeAddRemUpdMenu;
