import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import CryptoJS from 'crypto-js' ;
import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import AddNewPermission from './AddNewPermission';

import BlockUnblock from './BlockUnblock';
import Unlock from './Unlock';
import EmployeeMenuPage from './EmployeeMenuPage';

class TaskMapping extends Component{

  constructor() {
        super()
        this.state = {

                      };
          }

/* react valitation*/


componentDidMount(){

  
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
                               <Route path="/" component={TaskMapping}/>
                               <Route  path="/" component={() =><BlockUnblock data={data}/>}/>
                                       </div>
                                            </Router>,
                                                      document.getElementById('root'));
                                                      registerServiceWorker();
                                                  }   
          
  });
  
}



        

 BlockUnblockFunc(){
    
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
                               <Route path="/" component={TaskMapping}/>
                               <Route  path="/" component={() =><BlockUnblock data={data}/>}/>
                                       </div>
                                            </Router>,
                                                      document.getElementById('root'));
                                                      registerServiceWorker();
                                                  }   
          
  });
}

UnlockFunc(){
  ReactDOM.render(
    <Router >
    <div>
    <Route path="/" component={EmployeeMenuHeader}/>
    <Route path="/" component={TaskMapping}/>
             
    <Route path="/" component={Unlock}/>
                                        
      </div>
    </Router>, document.getElementById('root'));
              

}


AddNewPermission(){
  ReactDOM.render(
    <Router >
    <div>
    <Route path="/" component={EmployeeMenuHeader}/>
    <Route path="/" component={TaskMapping}/>
                  
    <Route path="/" component={AddNewPermission}/>
                                        
      </div>
    </Router>, document.getElementById('root'));
                  

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
        

      <div className="container">
      <ul class="previous disabled" 
      style={{float:"none",
      display:"inline-block",
      marginLeft:"5px",
      borderRadius: "5px",
      padding: "3px 7px 3px 7px"
      }}>
          <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
  
  
 

    
  <div id='horMenu'>
    <ul>
  <li><a onClick={()=>this.BlockUnblockFunc()}><span class="glyphicon glyphicon-ban-circle">Block/ Unblock</span></a></li>
  <li><a onClick={()=>this.UnlockFunc()}><span class="glyphicon glyphicon-lock">Unlock</span></a></li>
  
  <li><a className="active" onClick={()=>this.AddNewPermission()}><span class="glyphicon glyphicon-eye-open">Permission</span></a></li>
  
  </ul>
</div>
</div>

                    
                
            );
        }
    
    }
    
      


 
 
  
        
      
  


export default TaskMapping;

