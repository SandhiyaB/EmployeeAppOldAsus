import React,{Component} from 'react';
import OTPverifypage from './OTPverifypage';
import LoginPage from './LoginPage';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ForgotPassword extends Component{

constructor(props) {
        super(props)
        this.state = {
			 emailId: '',

        };
    }



	handleChangeemailid(value){
        this.setState({
            emailId: value
        });
    }

forgotpwd(){
			this.setState({
				emailId: this.state.emailId,

			});
                  var self=this;
							  $.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/EmployeeAttendenceAPI/forgotpassword/sendOTP",
							  contentType: "application/json",
							  dataType: 'json',
                async:false,

							  success: function(data,textStatus,jqXHR)
							  {
                  /*alert(self.state.emailId);
                  console.log(data);
					*/			  if(data==0){
                    ReactDOM.render(<OTPverifypage emailId={self.state.emailId}/>, document.getElementById("root"));

								  }
									  else{
										   /*alert("Please check your emailID");
										 */confirmAlert({
                            title: 'Invalid EmailId',                        // Title dialog
                            message: 'Please Check Your EmailId',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             });
       				}
							},

	});
}


BackbtnFunc(){
    ReactDOM.render(<LoginPage / > , document.getElementById("root"));
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

 <div className="jumbotron">
			<div className="form-group">
						  <label htmlFor="emailId">Reset Password:</label>
						  <input type="email" id="emailId" value={this.state.emailId} onChange={(e) =>this.handleChangeemailid(e.target.value)} className="form-control" placeholder="Enter your valid email" />
						</div>
						 <button type="button" id="" onClick={()=> this.forgotpwd()}  class="btn btn-primary">Submit</button>
			  		</div>
				</div>

		);
	}

}
export default ForgotPassword;