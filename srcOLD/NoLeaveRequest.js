import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'
import EmployeeMenuPage from './EmployeeMenuPage';



class NoLeaveRequest extends Component{
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
           {/*  <ul class="previous disabled" 
            style={{float:"none",
            display:"inline-block",
            marginLeft:"5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
            }}>
                <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
         */} <h3 className="centerAlign" style={{textAlign:"center",marginBottom:"20%"}}> No Leave Request</h3>

          
       
        
 </div>

    
                
            
        );
    }

}


export default NoLeaveRequest;
