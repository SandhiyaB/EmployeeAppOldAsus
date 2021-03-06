

import React,{Component} from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;


class AttendanceRegularisationAuthorize extends Component{
	constructor() {
        super()
        this.state = {
            date:'',
            checkInTime:'',
            checkOutTime:'',
            employeeId:'',
            companyId:'',
            superiorId:'',

        };
    }



    

		componentDidMount() {
           /*  $.getJSON("http://localhost:3000/AttendanceRegularisationAuthorize?com.fillingstation.json.EmployeeAttendanceJSON@52fb42db", function(result){
                $.each(result, function(i, field){
                   alert("json",result);
                });
            });
			 */
           var url=window.location.href.split( '?' );
           //var res = url.split("/");
           for (var i = 0; i < url.length; i++) {
            var value;
            this.state.employeeId = url[1];
            this.state.companyId = url[2];
            this.state.date = url[3];
            this.state.checkInTime = url[4];
            this.state.checkOutTime = url[5];
            
            alert(url[i]);
          }
          this.setState({
            date:this.state.date,
       checkInTime:this.state.checkInTime,
       checkOutTime:this.state.checkOutTime,
       employeeId:this.state.employeeId,
       });
           alert(url);
        }
    Authorize(){

        var companyId=CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
		var superiorId=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId=companyId;
    this.state.superiorId=superiorId;
		this.setState({
			companyId:companyId,
      superiorId:superiorId,
        });
        alert(JSON.stringify(this.state));
		/* var self=this;

            /* alert(JSON.stringify(this.state));
             $.ajax({
                    type: 'POST',
                    data:JSON.stringify({
                      date:this.state.date,
       checkInTime:this.state.checkInTime,
       checkOutTime:this.state.checkOutTime,
       employeeId:this.state.employeeId,
       companyId:this.state.companyId,
       }),
                    url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeeTimeRegulation",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                    {
                      
                                confirmAlert({
										title: 'Success',                        // Title dialog
									    message: 'Successfully Authorized',               // Message dialog
										confirmLabel: 'Ok',                           // Text button confirm
											                                
								});
						ReactDOM.render(<LoginPage/>, document.getElementById("root"));
	                                
											
					}



	        }); */
}
         




   

	render(){
		return(

	        <div className="container" style={{marginBottom:"20% important"}}>
   
                <button type="button" onClick={()=> this.Authorize()} class="btn btn-primary">Authorize</button>
	            <button type="button" onClick={()=> this.NotAuthorize()} class="btn btn-primary">Not Authorize</button>

			</div>
		

		);
	}

}
export default AttendanceRegularisationAuthorize;