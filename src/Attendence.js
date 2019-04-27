import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';
import { CaptureFinger, PrepareScanner, VerifyFinger, getFalseRes, PostMFS100Client, quality, timeout } from './Mantra.js';


class Attendence extends Component {

  constructor() {
    super()
    var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      employeeId: '',
      checkInTime: '',
      date: '',
      checkOutTime: '',
      companyId: '',
      biometric: biometric,

    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
    );
  }





  componentDidMount() {
    this.interval = setInterval(() => this.offlineData(), 2000);
  }


  offlineData() {

    if (navigator.onLine) {


      var dbPromise = idb.open('Attendance-db');

      dbPromise.then(function (db) {
        if (db.objectStoreNames.contains('checkIn') || db.objectStoreNames.contains('checkOut')) {
          var tx = db.transaction('checkIn', 'readonly');
          var keyValStore = tx.objectStore('checkIn');
          var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
            if (!cursor) return;
            /* console.log('cursor value', cursor.key);
             console.log('online');
 */


            $.ajax({
              type: 'POST',
              data: cursor.value,
              url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckin",
              contentType: "application/json",
              dataType: 'json',
              async: false,

              success: function (data, textStatus, jqXHR) {
               /* console.log(data);
                alert(data);
               */ if (data.employeeName == "NOT_VAILD") {
                  confirmAlert({
                    title: 'Invalid EmployeeId',                        // Title dialog
                    message: 'Enter Valid Employee Id',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "ALREADY_CHECKIN") {
                  confirmAlert({
                    title: 'Already Checked In',                        // Title dialog
                    message: data.employeeId + ' is already checked in today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }

                else {

                  confirmAlert({
                    title: 'Checked In',                        // Title dialog
                    message: 'Successfully Checked In  ' + data.employeeId,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })

                }



              },
              error: function (data) {
               /* console.log('#####################error:################################' + data);
               */  confirmAlert({
                  title: 'Server Error',                        // Title dialog
                  message: 'Server Error Try Again Later',               // Message dialog
                  confirmLabel: 'Ok',                           // Text button confirm


                });


              },


            });

            dbPromise.then(function (db) {
              var tx = db.transaction('checkIn', 'readwrite');
              var keyValStore = tx.objectStore('checkIn');
             /* console.log('deleting', cursor.key);
             */ return keyValStore.delete(cursor.key);

            });
            return cursor.continue().then(cursorIterate);
          });


          var dbPromise = idb.open('Attendance-db', 2);

          var tx = db.transaction('checkOut', 'readonly');
          var keyValStore = tx.objectStore('checkOut');
          var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
            if (!cursor) return;
          /*  console.log('cursor value', cursor.key);
            console.log('online');
          */  $.ajax({
              type: 'POST',
              data: cursor.value,
              url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckout",
              contentType: "application/json",
              dataType: 'json',
              async: false,

              success: function (data, textStatus, jqXHR) {
                /*console.log(data);
                alert(data);
                */if (data.employeeName == "NOT_VAILD") {
                  confirmAlert({
                    title: 'Invalid EmployeeId',                        // Title dialog
                    message: 'Enter Valid Employee Id',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "NOT_CHECKED_IN") {
                  confirmAlert({
                    title: 'Not Checked In',                        // Title dialog
                    message: data.employeeId + ' is not checked in today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "ALREADY_CHECKOUT") {
                  confirmAlert({
                    title: 'Already Checked In',                        // Title dialog
                    message: data.employeeId + ' is already checked out today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else {

                  confirmAlert({
                    title: 'Checked Out',                        // Title dialog
                    message: 'Successfully Checked Out  ' + data.employeeId,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })


                }




              },
              error: function (data) {
                /*console.log('#####################error:################################' + data);
                */confirmAlert({
                  title: 'Server Error',                        // Title dialog
                  message: 'Server Error Try Again Later',               // Message dialog
                  confirmLabel: 'Ok',                           // Text button confirm


                });


              },


            });

            dbPromise.then(function (db) {
              var tx = db.transaction('checkOut', 'readwrite');
              var keyValStore = tx.objectStore('checkOut');
             /* console.log('deleting', cursor.key);
             */ return keyValStore.delete(cursor.key);

            });
            return cursor.continue().then(cursorIterate);
          });





        }

      });
    }
  }
  //Check Whether Check In with Bio Or not

  checkIn() {

    if (this.state.biometric == 1) {

      this.CheckInWithBio();

    }
    else {
      alert("entering without biometric proces");
      //no biometric validation Straight Go to CheckIn Confirm
      confirmAlert({
        title: 'Check In', // Title dialog
        message: 'Are you sure want to Check In ' + this.state.employeeId, // Message dialog
        confirmLabel: 'Confirm', // Text button confirm
        cancelLabel: 'Cancel', // Text button cancel
        onConfirm: () => { this.CheckInConfirm() }, // Action after Confirm
        onCancel: () => { this.NoAction() }, // Action after Cancel


      })
    }
  }

  CheckInWithBio() {

    alert("Finger Check In Confirm");
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        employeeId: this.state.employeeId,
        companyId: this.state.companyId,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/fingerprint/employeeBio",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var empBio;
        if (data.fingerPrint != null) {
          empBio = data.fingerPrint;
          alert("success " + data.fingerPrint);

          self.bioCapture(empBio);



        } else {
          alert("Invalid employeeID");

        }

      },
      error: function (jqXHR, ajaxOptions, thrownError) {

        alert("error");
      },
    });

  }

  bioCapture(dbFinger) {
    alert("fun");
    var self = this;
    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/EmployeeAttendenceAPI/Biometric/CheckInBio",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data) {
        console.log("biodtata", data);
        alert("success");
        if (data.ErrorCode == '0') {

          self.VerifyFinger(dbFinger, data.AnsiTemplate);
          console.log("data", dbFinger, data.AnsiTemplate);
        }
        else {

          confirmAlert({
            title: 'DEVICE ERROR', // Title dialog
            message: 'Check your biometric device ',// Message dialog
            confirmLabel: 'ok', // Text button confirm


          })


        }

      },
      error: function (data) {
        console.log("biodtata", data);
        alert("error");
      }
    });

  }

  VerifyFinger(dbFinger, currentAnsi) {
    console.log("data12", dbFinger, currentAnsi);
    alert("Verify Finger " + currentAnsi);
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        dbFingerValue: dbFinger,
        currentFingerValue: currentAnsi,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/Biometric/BioVerification",
      contentType: "application/json",

      dataType: 'json',
      async: false,
      success: function (data) {
        console.log("Bio Verification", data);
        alert("success");

        if (data.Status == true) {
          alert("value correct");
          self.CheckInConfirm();
        }
        else {

          alert("Incorrect");
          confirmAlert({
            title: 'Authorization Error Message',                        // Title dialog
            message: 'Retry FingerPrint Authorization',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });
        }

      },
      error: function (data) {
        console.log("Bio Verification", data);
        alert("error");
      }
    });

  }




  CheckInConfirm() {

    var today = new Date();

    var currenttime = today.toLocaleTimeString([], { hour12: false });
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.checkInTime = currenttime;
    this.state.date = today;
alert("current time"+currenttime);


    this.setState({
      checkInTime: currenttime,
      employeeId: this.state.employeeId,
      date: today,

    });

   /* //alert("checkIn");
    //alert(this.state.date);
    //alert(this.state.checkInTime);
   */ var self = this;
    if (navigator.onLine) {

      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          checkInTime: this.state.checkInTime,
          employeeId: this.state.employeeId,
          date: this.state.date,
          companyId: this.state.companyId,
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckin",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {
          /*console.log(data);
          alert(data);
          */if (data.employeeName == "NOT_VAILD") {
            confirmAlert({
              title: 'Invalid EmployeeId',                        // Title dialog
              message: 'Enter Valid Employee Id',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "BLOCKED") {
            confirmAlert({
              title: 'BLOCKED',                        // Title dialog
              message: data.employeeId + '  has been BLOCKED',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "ALREADY_CHECKIN") {
            confirmAlert({
              title: 'Already Checked In',                        // Title dialog
              message: data.employeeId + ' is already Checked In today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else {

            confirmAlert({
              title: 'Checked In',                        // Title dialog
              message: 'Successfully Checked In  ' + data.employeeId,               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })

          }
          self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })

        },
        error: function (data) {
          /*console.log('#####################error:################################' + data);
          */confirmAlert({
            title: 'Server Error',                        // Title dialog
            message: 'Server Error Try Again Later',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });

        },


      });
    } else {
     /* console.log('offline');
     */ var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      var message = JSON.stringify({
        checkInTime: this.state.checkInTime,
        employeeId: this.state.employeeId,
        date: this.state.date,
        companyId: this.state.companyId,
      });

      var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
        switch (upgradeDb.oldVersion) {
          case 0:

          case 1:
            upgradeDb.createObjectStore('checkOut', { autoIncrement: true });
            upgradeDb.createObjectStore('checkIn', { autoIncrement: true });
        }
      });
      dbPromise.then(function (db) {
        var tx = db.transaction('checkIn', 'readwrite');
        var keyValStore = tx.objectStore('checkIn');
        keyValStore.put(message);
        return tx.complete;

      }).then(function (val) {
        /*console.log('the value of offline added');
     */ });
      self.state.employeeId = '';
      self.setState({
        employeeId: '',
      })

    }
  }


  checkOut() {

    if (this.state.biometric == 1) {

      this.CheckOutWithBio();

    }
    else {
      alert("entering without biometric proces");
      //no biometric validation Straight Go to CheckIn Confirm
      confirmAlert({
        title: 'Check Out',                        // Title dialog
        message: 'Are you sure want to Check Out ' + this.state.employeeId,               // Message dialog
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { this.CheckOutConfirm() },    // Action after Confirm
        onCancel: () => { this.NoAction() },      // Action after Cancel

      })
    }
  }

  CheckOutWithBio() {
    alert("Finger Check In Confirm");
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        employeeId: this.state.employeeId,
        companyId: this.state.companyId,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/fingerprint/employeeBio",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var empBio;
        if (data.fingerPrint != null) {
          empBio = data.fingerPrint;
          alert("success " + data.fingerPrint);


        } else {
          alert("Invalid employeeID");

        }

      },
      error: function (jqXHR, ajaxOptions, thrownError) {

        alert("error");
      },
    });

  }



  CheckOutConfirm() {
    var today = new Date();

    var currenttime = today.toLocaleTimeString([], { hour12: false });
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.checkOutTime = currenttime;
    this.state.date = today;
    this.setState({
      checkOutTime: currenttime,
      employeeId: this.state.employeeId,
      date: today,

    });

    /*alert(this.state.date);
    alert(this.state.checkOutTime);
*/
    var self = this;
    if (navigator.onLine) {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          checkOutTime: this.state.checkOutTime,
          employeeId: this.state.employeeId,
          date: this.state.date,
          companyId: this.state.companyId,
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckout",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {
         /* console.log(data);
          /*alert(data);
          */if (data.employeeName == "NOT_VAILD") {
            confirmAlert({
              title: 'Invalid EmployeeId',                        // Title dialog
              message: 'Enter Valid Employee Id',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "NOT_CHECKED_IN") {
            confirmAlert({
              title: 'Not Checked In',                        // Title dialog
              message: data.employeeId + ' is not checked in today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "ALREADY_CHECKOUT") {
            confirmAlert({
              title: 'Already Checked Out',                        // Title dialog
              message: data.employeeId + ' is already checked out today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          } else {
            confirmAlert({
              title: 'Checked Out',                        // Title dialog
              message: ' Successfully Checked Out  ' + data.employeeId,               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })


          }

          self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })


        },
        error: function (data) {
         /* console.log('#####################error:################################' + data);
         */confirmAlert({
            title: 'Server Error',                        // Title dialog
            message: 'Server Error Try Again Later',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          });


        },


      });

    } else {
      /*console.log('offline');
      */var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      var message = JSON.stringify({
        checkOutTime: this.state.checkOutTime,
        employeeId: this.state.employeeId,
        date: this.state.date,
        companyId: this.state.companyId,
      });



      var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
        switch (upgradeDb.oldVersion) {
          case 0:

          case 1:
            upgradeDb.createObjectStore('checkOut', { autoIncrement: true });
            upgradeDb.createObjectStore('checkIn', { autoIncrement: true });
        }
      });

      dbPromise.then(function (db) {
        var tx = db.transaction('checkOut', 'readwrite');
        var keyValStore = tx.objectStore('checkOut');
        keyValStore.put(message);
        return tx.complete;

      }).then(function (val) {
       /* console.log('the value of offline added');
      */});
      self.state.employeeId = '';
      self.setState({
        employeeId: '',
      })
    }
  }


  NoAction() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={Attendence} />


        </div>
      </Router>, document.getElementById('root'));
    this.state.employeeId = '';
    this.setState({
      employeeId: '',
    })


  }

  //Capturing and Storing The Finger Print

  Capture() {
    try {

      var res = CaptureFinger(quality, timeout);
      if (res.httpStaus) {

        if (res.data.ErrorCode == "0") {

          this.store(res.data.AnsiTemplate);
        }
      }
      else {
        alert(res.err);
      }
    }
    catch (e) {
      alert(e);
    }
    return false;
  }
  //Storing Finger Print (need this to add in add employee)
  store(iso) {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: "http://localhost:8080/EmployeeAttendenceAPI/fingerprint/store",
      data: JSON.stringify({
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
        fingerPrint: iso
      }),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      processData: false,
      success: function (data) {
        alert("stored succesfully");
      },
      error: function (jqXHR, ajaxOptions, thrownError) {

        alert("error");
      },
    });

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

      <div className="container " style={{
        marginBottom: "20%",

      }}>
        <ul class="previous disabled"
          style={{
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>


        <div class="form-group"
          style={{
            textAlign: "center",
            display: "block"
          }}>
          <label htmlFor="employeeId"
          >Employee ID:</label>
          <input
            type="number"
            autoFocus
            value={this.state.employeeId}
            required
            name="employeeId"
            onChange={this.handleUserInput}
            className="form-control"
            id="employeeId"
            placeholder="Enter EmployeeId"

            style={{
              width: "50%",
              height: "50px",
              display: "inline-block",
              marginLeft: "10px"
            }}
          />
        </div>

        <div className="row" id="checkInOut" >
          <div className="col-sm-6 col-xs-6" id="colcheckIn">
            <a to="/" onClick={() => this.checkIn()} id="checkIn" className="" ></a>
          </div>
          <div className="col-sm-6 col-xs-6" id="colcheckIn">
            <a to="/" id="checkOut" onClick={() => this.checkOut()} ></a>
          </div>
          <div>
            <input type="submit" id="btnCapture" value="Capture" class="btn btn-primary btn-100" onClick={() => this.Capture()} />
          </div>
        </div>







      </div>


    );
  }

}

export default Attendence;
