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
import EmployeeMenuPage from './EmployeeMenuPage';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';
import BackGroundColorSettings from './BackGroundColorSettings';
import HolidayConfig from './HolidayConfig';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';
import CreatingNewShift from './CreatingNewShift';
import ExistingShiftDetails from './ExistingShiftDetails';



class ConfigurationPage extends Component {


  constructor(props) {
    super(props)
    var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {
      date: '',

      employeeId: '',
      companyId: '',
      dateValid: false,

      switched: false,
      editsave: 'edit',
      workingHours: '',
      biometric: biometric,
    }
  }
  biometricChange = () => {
    alert(this.state.biometric);

    if (this.state.biometric == 0) {
      this.state.biometric = 1;

      this.setState({
        biometric: 1,
      })
    } else {
      alert("off");
      this.state.biometric = 0;

      this.setState({
        biometric: 0,
      })
    }
    alert("biometricFunc");
    this.biometricFunc();
  };

  biometricFunc() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state.companyId = companyId;

    alert("enter biofunc" + this.state.biometric);
    this.setState({
      companyId: companyId,


    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
        biometricValue: this.state.biometric,
      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/BiometricSettings",
      contentType: "application/json",

      async: false,

      success: function (data, textStatus, jqXHR) {
        console.log(data);
        alert(data);

        self.state.biometric = data.biometricValue;

        var key = "shinchanbaby";

        localStorage.setItem('BiometricValue', CryptoJS.AES.encrypt(data.biometricValue.toString(), key));
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


  handleWorkingHour = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      workingHours: value,


    });


  }


  WorkingHours() {

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
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/WorkingHours",
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
    self.WorkingHours();


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
      minTime: '00:00:00',
      maxTime: '24:00:00',

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
    var self = this;
    $.ajax({
      type: 'POST',


      data: JSON.stringify({

        companyId: this.state.companyId,
        workingHours: this.state.workingHours,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/UpdateWorkingHours",
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
        self.setState({ editsave: 'edit' });
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


  Shift() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/employeeshiftconfig/getshiftconfigdata",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        console.log(data);
        alert("success");


        if (data.shiftData.length == 0) {
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={CreatingNewShift} />

              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();

        } else {
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={() => <ExistingShiftDetails data={data} />} />

              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();

        }


      },
      error: function (data) {
        /* console.log('#####################error:################################' + data);
        */

        confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm


        });


      },


    });
  }


  HolidayFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayConfig} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();

  }
  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={EmployeeMenuPage} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }



  render() {


    return (




      <div className="container" style={{ marginBottom: '30%' }}>
        <ul class="previous disabled"
          style={{
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

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
                      onSelect={this.handleWorkingHour}

                    />
                  </td>

                  <td>
                    {(this.state.editsave === 'edit'
                      ? <button className="stop-btn" onClick={() => this.edit()}>edit</button>
                      : <button className="stop-btn" onClick={() => this.SaveBtn()} >save</button>
                    )}

                  </td>
                </tr>
                <tr>

                  <td>Shift</td>
                  <td> <button type="button" onClick={() => this.Shift()} class="btn btn-default">Shift Details</button>
                  </td>
                </tr>

                <tr>

                  <td>Holiday Details</td>
                  <td><button type="button" onClick={() => this.HolidayFunc()} class="btn btn-default">Holiday Details</button> </td>
                </tr>
                {/* <tr>

                  <td>OTP-Enable</td>
                  <td><Switch onClick={this.toggleSwitch} on={this.state.switched} /> </td>
                </tr> */}
                <tr>

                  <td>Bio-Enable</td>
                  <td> <Switch onClick={this.biometricChange} on={this.state.biometric} />
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
