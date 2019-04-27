import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AuditReport from './AuditReport';


class SearchAudit extends Component{

	constructor() {
        super()
        }


componentDidMount() {
			
             var tab='<thead><tr class="headcolor"><th>SuperiorId</th><th>Name</th></th><th>Role</th><th>Operation</th><th>date</th><th>time</th></tr></thead>';
                  
                  
             $.each(this.props.data, function (i, item) {
                tab += '<tr class="success" ><td>' + item.superiorId + '</td><td>' + item.employeeName +'</td><td>' + item.role + '</td><td>' + item.operation + '</td><td>' + item.date + '</td><td>' + item.time + '</td></tr>';
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
			

			
	<div class="container">
     <ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

	 <h3 className="centerAlign" style={{textAlign:"center"}}>Search Result</h3>
   
          <div>
          <div id="tableOverflow" style={{ marginBottom:"30%"}}>
        <table class="table" id="tableHeadings">
        
     	
         </table>
         </div>
         
        </div>
   
        
 </div>

	
				
			
		);
	}

}


export default SearchAudit;
