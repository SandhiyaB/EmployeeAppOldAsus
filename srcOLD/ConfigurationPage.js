import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
 Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
import {
 FormErrors
} from './FormErrors';
import {
 BrowserRouter as Router,
 Route,
 NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
//import timepicker from 'jquery-ui-timepicker-addon/src/jquery-ui-timepicker-addon';
//import timepicker from 'jquery-ui/ui/widgets/timepicker';
//import timepicker from 'timepicker/jquery.timepicker';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';
import BackGroundColorSettings from './BackGroundColorSettings';

import '../node_modules/react-toggle-switch/dist/css/switch.min.css';
import LeaveType from './LeaveType';





class ConfigurationPage extends Component {


 constructor(props) {
 super(props)
 this.state = {
 date: '',
 checkInTime: '',
 checkOutTime: '',
 employeeId: '',
 companyId: '',
 dateValid: false,
 checkInTimeValid: false,
 checkOutTimeValid: false,
 employeeIdValid: false,
 switched: false,
 editsave: 'edit',
 workingHours: '',

 }
 }

 toggleSwitch = () => {
 this.setState(prevState => {
 return {
 switched: !prevState.switched
 };
 });
 };

 handleUserInput = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({
 [name]: value,
 employeeIdValid: true
 });

 }


 handleUserInputDate = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({
 [name]: value,
 dateValid: true
 });

 }


 handleCheckIn = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 
 this.setState({
 workingHours:value,

 
 });


 }


 handleCheckOut = (e) => {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({
 [name]: value,
 checkOutTimeValid: true
 });
 //$("#checkInTime").timepicker('option', 'maxTime', value);


 }

 Submit() {
 /* alert(this.state.date);
 alert(this.state.checkOutTime);
 */ var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 this.state.companyId = companyId;
 this.setState({
 companyId: companyId,
 });

 var self = this;

 /* alert(JSON.stringify(this.state));
 */ $.ajax({
 type: 'POST',
 data: JSON.stringify({
 date: this.state.date,
 checkInTime: this.state.checkInTime,
 checkOutTime: this.state.checkOutTime,
 employeeId: this.state.employeeId,
 companyId: this.state.companyId,
 }),
 url: "http://localhost:8080/EmployeeAttendenceAPI/Mail/AttendanceRegularizationMail",
 contentType: "application/json",
 dataType: 'json',
 async: false,
 success: function (data, textStatus, jqXHR) {
 /* console.log(data);
 alert(data);
 */ if (data.employeeId == "BLOCKED") {

 confirmAlert({
 title: 'Blocked', // Title dialog
 message: self.state.employeeId + ' Id has been Blocked', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 })

 }
 else {

 confirmAlert({
 title: 'Attendance Regulation', // Title dialog
 message: 'Attendance values are Updated', // Message dialog
 confirmLabel: 'Ok', // Text button confirm
 })

 ReactDOM.render(
 <Router>
 <div>


 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();

 }


 },
 error: function (data) {
 /* console.log('#####################error:################################'+data);
 */confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 });

 },
 });

 this.setState({
 date: '',
 checkInTime: '',
 checkOutTime: '',
 employeeId: '',
 companyId: '',
 dateValid: false,
 checkInTimeValid: false,
 checkOutTimeValid: false,
 employeeIdValid: false,


 });


 }

 WorkingHours() {
 /*alert("ATTENDANCE");
 */
 /* var today = new Date();
 today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
 this.state.date = today;
 this.setState({
 
 date: today,
 
 }); */
 /*alert(this.state.date);
 */
 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 this.state.companyId = companyId;
 this.setState({
 companyId: companyId,

 });

 var self = this;
 $.ajax({
 type: 'POST',
 data: JSON.stringify({

 companyId: this.state.companyId,

 }),
 url: "http://localhost:8080/EmployeeAttendenceAPI/employee/workingHours",
 contentType: "application/json",

 async: false,

 success: function (data, textStatus, jqXHR) {
 console.log(data);
 alert(data);

 self.state.workingHours = data;

 /* self.setState({
 workingHours:data,
 }); */

 },
 error: function (data) {
 /* console.log('#####################error:################################' + data);
 */
 console.log(data);
 confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 });

 },

 });



 }


 componentDidMount() {
 var self = this;
 //self.WorkingHours();


 $('#date').datepicker({

 onSelect: function (date) {

 var dt = new Date(date);
 self.setState({
 date: date,
 dateValid: true,
 });

 },

 dateFormat: 'yy/mm/dd',
 minDate: '-3M',
 maxDate: '-1D',
 numberOfMonths: 1
 });




 $('#workingHours').timepicker({
 
 timeFormat: 'H:i:s',
 interval: 30,
 minTime: '06:00:00',
 maxTime: '10:00:00',

 });


 }

 BackGroundColorFunc() {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EmployeeMenuHeader} />
 <Route path="/" component={BackGroundColorSettings} />
 </div>
 </Router>,
 document.getElementById('root'));
 registerServiceWorker();
 }

 edit() {

 $("#workingHours").prop('disabled', false);
 this.setState({
 editsave: 'save',

 })
 }

 SaveBtn() {

 /*alert(this.state.firstName);
 */
 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
 this.state.companyId = companyId;
 
 this.setState({
 companyId: companyId,
 

 });
 alert(JSON.stringify(this.state));

 /*alert(JSON.stringify(this.state));
 */
 var self=this;
 $.ajax({
 type: 'POST',


 data: JSON.stringify({

 companyId: this.state.companyId,
 workingTime: this.state.workingHours,

 }),
 url: "http://localhost:8080/EmployeeAttendenceAPI/employee/updateworkinghours",
 contentType: "application/json",
 dataType: 'json',
 async: false,
 success: function (data, textStatus, jqXHR) {
 console.log(data);
 confirmAlert({
 title: 'Saved', // Title dialog
 message: 'Suceessfully updated ', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 self.setState({editsave:'edit'});
 $("#workingHours").prop('disabled', true);
 },
 error: function (data) {
 /* console.log('#####################error:################################'+data);
 */
 console.log(data);
 alert("data")
 confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 });

 },
 });

 }

HolidayFunc(){
    ReactDOM.render(
        <Router>
          <div>           
                 <Route path="/" component={EmployeeMenuHeader}/>
                 <Route path="/" component={LeaveType}/>
                 
                         </div>
                              </Router>,
                                        document.getElementById('root'));
                                        registerServiceWorker();
                                   
   }                                     


 render() {


 return (




 <div className="container" style={{ marginBottom: '30%' }}>
 <div class="jumbotron">
 <h3>Configuration Details</h3>
 <div class="table-responsive">
 <table class="table">
 <thead>
 <tr>

 <th></th>
 </tr>
 </thead>
 <tbody>
 <tr>

 <td>Background-Theme</td>
 <td><button type="button" onClick={() => this.BackGroundColorFunc()} class="btn btn-default">Select</button> </td>
 </tr>
 <tr>

 <td>Minimum Working Hour</td>
 <td>
 <input
 style={{ width: "65%" }}

 type="text"
 // data-step="5"
 value={this.state.workingHours}
 required
 name="workingHours"
 className="form-control"
 id="workingHours"
 disabled
 onSelect={ this.handleCheckIn}

 />
 </td>
 {/* <td> <input
 style={{ width: "65%" }}
 // class="form-control" 
 type="button"
 // data-step="5"
 value={this.state.editsave}
 required
 name="checkInTime"
 onClick={() => this.edit()}
 
 className="form-control"
 id="checkInTime"
 

 /></td> */}
 <td>
 {(this.state.editsave === 'edit'
 ? <button className="stop-btn" onClick={() => this.edit()}>edit</button>
 : <button className="stop-btn" onClick={() => this.SaveBtn()} >save</button>
 )}

 {/* <input
 style={{ width: "65%" }}
 // class="form-control" 
 type="text"
 // data-step="5"
 value={this.state.checkInTime}
 required
 name="checkInTime"
 onSelect={this.handleCheckIn}
 className="form-control"
 id="checkInTime"
 placeholder="SET"
 /> */} </td>
 </tr>
 <tr>

 <td>Holiday Details</td>
 <td><button type="button" onClick={() => this.HolidayFunc()} class="btn btn-default">Holiday Details</button> </td>
 </tr>
 <tr>

<td>OTP-Enable</td>
 <td><Switch onClick={this.toggleSwitch} on={this.state.switched} /> </td>
 </tr>
 <tr>

 <td>Bio-Enable</td>
 <td> <Switch onClick={this.toggleSwitch} on={this.state.switched} />
 </td> 
 </tr>
 </tbody>
 </table>
 </div>

 </div>




 </div>

 );



 }

}
export default ConfigurationPage;
