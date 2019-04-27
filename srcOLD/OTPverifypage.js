import React,{Component} from 'react';
import LoginPage from './LoginPage';
import Newpassword from './Newpassword';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class OTPverifypage extends Component{
	constructor(props) {
        super(props)
        this.state = {
			 emailId:'',
			 otp: '',

        };
    }


	handleChangeotp(value){
        this.setState({
            otp: value
        });
    }

		componentDidMount() {
		/*	console.log(this.props.emailId);
     */var emailIdProps=this.props.emailId;
			this.setState({
				emailId:emailIdProps
			});
}
OTPverify(){
	this.setState({
		emailId: this.state.emailId,
		otp:this.state.otp
	 });
                var self=this;
							  $.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/EmployeeAttendenceAPI/employee/verifyOTP",
							  contentType: "application/json",
							  dataType: 'json',


							  success: function(data,textStatus,jqXHR)
							  {
									/*alert(self.state.emailId);
								   */if(data==0){
										 /*console.log(self.state.emailId);
										 */ReactDOM.render(<Newpassword emailId={self.state.emailId}/>, document.getElementById("root"));
									 }
									  else{
										    confirmAlert({
                            title: 'Invalid OTP',                        // Title dialog
                            message: 'OTP is not Correct',               // Message dialog
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
<div className="jumbotron ">
			<div className="form-group">
						  <label htmlFor="otp">OTP:</label>
						  <input type="text" id="OTP"  value={this.state.otp} onChange={(e) =>this.handleChangeotp(e.target.value)}  className="form-control" placeholder="Enter OTP" />
						</div>
						 <button type="button" onClick={()=> this.OTPverify()} class="btn btn-primary">Submit</button>

			</div>
			</div>
		);
	}

}
export default OTPverifypage;