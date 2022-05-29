import React, { useState } from 'react'
import "./RegistrationPage.css"
import data from "./supportData.json";
function RegistrationPage() {
  const [districtList, setDistrictList] = useState([]);
  const [genderSelected, setGenderSelected] = useState("");
  const [stateSelected, setStateSelected] = useState("Select State");
  const [districtSelected, setDistrictSelected] = useState("Select District");

  const selectStateHandler = (e) => {
    setStateSelected(e.target.value);
    setDistrictList([]);

    data[0].states.map((state, stateIndex) => {
      if (state.state === e.target.value) {
        data[0].states[stateIndex].districts.map((district, index) => {
          setDistrictList((prev) => (
            [...prev, <option option key={index} value={district} > {district}</option >]
          ))
        });
      }
    })



  };




  return (
    <div className="container">
      <div className="registration-box">
        <h1>Registration</h1>
        <form action="../../new" method="post">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />
            <label>Surname</label>
            <input type="text" name="surname" placeholder="Surname" />
            <label>Name and Surname of relative of applicant</label>
            <input type="text" name="n_s_relative" placeholder="Name and Surname of relative" />
            <label>Type of relation</label>
            <input type="text" name="relation" placeholder="Type of relation" />
            <label>Age</label>
            <input type="text" name="age" placeholder="Age" />
            <label>Date of birth</label>
            <input type="text" name="dob" placeholder="DOB" />
            <label>Gender</label>
            <select name="gender" value={genderSelected} onChange={() => setGenderSelected()}>
              <option value="Select Gender">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>
            <label>Address</label>
            <label>House No</label>
            <input type="text" name="house_no" placeholder="House No" />
            <label>Street/Area/Locality</label>
            <input type="text" name="street" placeholder="Street/Area/Locality" />
            <label>Town/Village</label>
            <input type="text" name="town" placeholder="Town/Village" />
            <label>Pincode</label>
            <input type="text" name="pincode" placeholder="Pincode" />
            <label>State</label>
            <select name="state" value={stateSelected} onChange={selectStateHandler}>
              <option value="Select State">Select State</option>
              {data[0].states.map((state, index) => {
                return <option key={index} value={state.state}>{state.state}</option>
              })}
            </select>
            <label>District</label>
            <select name="district" value={districtSelected} onChange={() => setDistrictSelected()}>
              <option value="Select District">Select District</option>
              {districtList}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage;