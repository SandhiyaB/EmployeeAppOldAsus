import React,{Component} from 'react';
import ReactDOM from 'react-dom';


import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';

import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Maintenance from './Maintenance';

import AddNewDepartment from './AddNewDepartment';
import RemoveDepartment from './RemoveDepartment';

class DepartmentAddRemove extends Component{

    constructor() {
        super()
        this.state = {

            };
                }

AddDepartmentFunc(){
    /*alert(" Maintenance page");
    */ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={DepartmentAddRemove}/>
                     <Route  path="/" component={AddNewDepartment}/>
                             </div>
                                  </Router>,
                                            document.getElementById('root'));
                                            registerServiceWorker();
                                        }       

RemoveDepartmentFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={EmployeeMenuHeader}/>
                     <Route path="/" component={DepartmentAddRemove}/>
                     <Route  path="/" component={RemoveDepartment}/>
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
       
    


<div className="btn-group btn-group-justified"  style={{float:"none"}}>
 

     <div class="btn-group active">

    <button type="button"  onClick={()=>this.AddDepartmentFunc()} class="btn btn-info"><span class="glyphicon glyphicon-plus">Add</span></button>

  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-danger" onClick={()=>this.RemoveDepartmentFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </button>
  </div>
  
    </div>

{/* <div id='horMenu'>
    <ul>
  <li><a   onClick={()=>this.EmployeeFunc()}><span class="glyphicon glyphicon-plus">Employee</span></a></li>
  <li><a onClick={()=>this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove </span></a></li>
  <li><a onClick={()=>this.UpdateFunc()}><span class="glyphicon glyphicon-refresh">Update</span></a>
    
  </li>
</ul>

</div> */}



 
</div>

    
                
            
        );
    }

}


export default DepartmentAddRemove;