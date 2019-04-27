import React, { Component } from 'react';
//import LoginPage from './LoginPage';
//import { FormErrors } from './FormErrors';
//

import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CryptoJS from 'crypto-js';
import HolidayConfig from './HolidayConfig';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Shift1 from './Shift1';

class Shift extends Component {


    constructor() {

        super()
        this.state = {
            shift1: '',
            shift2: '',
            shift3: '',
            shiftTime: '',
            s1from: '',
            s1to: '',
            s2from: '',
            s2to: '',
            s3from: '',
            s3to: '',
            companyId: '',
            totalNoOfShift: '',
        };

    }

    componentDidMount() {
        $("#tr1").hide();
        $("#tr2").hide();
        $("#tr3").hide();

        this.TimePicker();
    }
    TimePicker() {
        $('#shift1').timepicker({
            onSelect: function (time) {
                $("#shift11").timepicker('option', 'minTime', time);

                this.state.s1from = time;
                this.setState({
                    s1from: time,
                });
            },

            timeFormat: 'H:i:s',
        });

        $('#shift11').timepicker({
            onSelect: function (time) {
                $("#shift1").timepicker('option', 'maxTime', time);

                this.state.s1to = time;
                this.setState({
                    s1to: time,
                });

            },

            timeFormat: 'H:i:s',

        });


        $('#shift2').timepicker({
            onSelect: function (time) {
                $("#shift22").timepicker('option', 'minTime', time);

                this.state.s2from = time;
                this.setState({
                    s2from: time,
                });
            },

            timeFormat: 'H:i:s',
        });

        $('#shift22').timepicker({
            onSelect: function (time) {
                $("#shift2").timepicker('option', 'maxTime', time);

                this.state.s2to = time;
                this.setState({
                    s2to: time,
                });

            },

            timeFormat: 'H:i:s',

        });


        $('#shift3').timepicker({
            onSelect: function (time) {
                $("#shift33").timepicker('option', 'minTime', time);

                this.state.s3from = time;
                this.setState({
                    s3from: time,
                });
            },

            timeFormat: 'H:i:s',
        });

        $('#shift33').timepicker({
            onSelect: function (time) {
                $("#shift3").timepicker('option', 'maxTime', time);

                this.state.s3to = time;
                this.setState({
                    s3to: time,
                });

            },

            timeFormat: 'H:i:s',

        });



    }

    handleFrom = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
        var no;
        this.setState({
            [name]: value,
            [id]: true
        });
        if (id == "shift1") {
            no = 1;
        } else if (id == "shift2") {
            no = 2;
        } else {
            no = 3;
        }
        $("#" + id + no).timepicker('option', 'minTime', value);


    }
    handleTo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
        this.setState({
            [name]: value,
            [id]: true
        });
        //$("#shift1").timepicker('option', 'maxTime', value);
        var totalshift = this.state.totalNoOfShift;

        var shiftcount;
        //     alert("shift"+id);
        if (id == "shift11") {
            shiftcount = "1";
            this.state.shift1 = "1";
            this.setState({
                shift1: this.state.shift1,
            });
        } else if (id == "shift22") {
            shiftcount = "2";
            this.state.shift2 = "2";
            this.setState({
                shift2: this.state.shift2,
            });
        } else {
            shiftcount = "3";
            this.state.shift1 = "3";
            this.setState({
                shift3: this.state.shift3,
            });
        }


    }



    handleShiftInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        alert("value" + value);

        if (value == 1) {
            $("#ShiftTable").show();
            $("#tr1").show();
            $("#tr2").hide();
            $("#tr3").hide();
        } else if (value == "2") {
            $("#ShiftTable").show();

            $("#tr1").show();
            $("#tr2").show();
            $("#tr3").hide();
        } else {
            $("#ShiftTable").show();
            $("#tr1").show();
            $("#tr2").show();
            $("#tr3").show();
        }
    }



    Submit() {
        alert(JSON.stringify(this.state));
        alert("submit jeeva");
        $("#ShiftTable").hide(); //jeeva 
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        alert(JSON.stringify(this.state));
        var totalshift = this.state.totalNoOfShift;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                shift1: this.state.shift1,
                shift2: this.state.shift2,
                shift3: this.state.shift3,
                s1from: this.state.s1from,
                s1to: this.state.s1to,
                s2from: this.state.s2from,
                s2to: this.state.s2to,
                s3from: this.state.s3from,
                s3to: this.state.s3to,
                companyId: this.state.companyId,
            }),
            url: "http://localhost:8080/EmployeeAttendenceAPI/employeeshiftconfig/shiftconfiginitialinsert",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                console.log(data);
                alert("success");

                /*                
                 $("#shift"+data.shift).val("");
                 $("#shift"+data.shift+data.shift).val("");
                 
                            if(totalshift==shiftcount)
                            {
                            alert("disabled submit");//jeeva
                            $("#submit").removeAttr("disabled");//jeeva
            
                     }
                     */
                //$("#submit").attr("disabled","false");//pri


                ReactDOM.render(
                    <Router>
                        <div>
                            <Route path="/" component={EmployeeMenuHeader} />
                            <Route path="/" component={() => <Shift1 />} />

                        </div>
                    </Router>,
                    document.getElementById('root'));
                registerServiceWorker();


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

    render() {

        return (
            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">

                    <p>SHIFT</p>


                    <label for="shift">
                        Total Shifts
    		</label>
                    <div>
                        <select name="totalNoOfShift"
                            id="shift"
                            onChange={this.handleShiftInput}
                            required>
                            <option value="" disabled selected hidden>Select your total no of Shifts</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>

                    <table id="ShiftTable" style={{ width: "65%" }}>
                        <tr>
                            <div >
                                <th>Shift</th><th >From</th><th>To</th>
                            </div>
                        </tr>
                        <tr id="tr1">

                            <div id="Shift1">
                                <td>
                                    <label for="shift1" >
                                        Shift-1
    		</label>
                                </td>

                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s1from}
                                        required
                                        name="s1from"
                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        id="shift1"
                                        placeholder="Enter Start Time"

                                    />                  </td>

                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s1to}
                                        required
                                        name="s1to"
                                        onSelect={this.handleTo}
                                        className="form-control"
                                        id="shift11"
                                        placeholder="Enter End Time"

                                    />                  </td>

                            </div>
                        </tr>

                        <tr id="tr2">

                            <div id="Shift2">
                                <td>
                                    <label for="shift2" >
                                        Shift-2
    		</label>
                                </td>
                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s2from}
                                        required
                                        name="s2from"
                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        id="shift2"
                                        placeholder="Enter Start Time"

                                    />                       </td>
                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s2to}
                                        required
                                        name="s2to"
                                        onSelect={this.handleTo}
                                        className="form-control"
                                        id="shift22"
                                        placeholder="Enter End Time"

                                    />                </td>


                            </div>
                        </tr>

                        <tr id="tr3">

                            <div id="Shift3">
                                <td>
                                    <label for="shift3" >
                                        Shift-3
    		</label>
                                </td>

                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s3from}
                                        required
                                        name="s3from"
                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        id="shift3"
                                        placeholder="Enter Start Time"

                                    />                     </td>
                                <td>
                                    <input

                                        type="text"
                                        data-step="5"
                                        value={this.state.s3to}
                                        required
                                        name="s3to"
                                        onSelect={this.handleTo}
                                        className="form-control"
                                        id="shift33"
                                        placeholder="Enter End Time"

                                    />                  </td>

                            </div>
                        </tr>
                    </table>
                    <button onClick={() => this.Submit()} id="submit">Submit</button>






                </div>
            </div>
        );
    }

}
export default Shift;
