import React, { useState } from 'react'
import "./RegistrationPage.css"
import data from "./supportData.json";
function RegistrationPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rsurname, setRsurname] = useState("");
  const [typeofr, setTypeofr] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [genderSelected, setGenderSelected] = useState("");
  const [house_no, setHouse_no] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [stateSelected, setStateSelected] = useState("Select State");
  const [districtSelected, setDistrictSelected] = useState("Select District");

  const [districtList, setDistrictList] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        rsurname: rsurname,
        typeofr: typeofr,
        age: age,
        dob: dob,
        genderSelected: genderSelected,
        house_no: house_no,
        street: street,
        city: city,
        pin: pin,
        stateSelected: stateSelected,
        districtSelected: districtSelected
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }
      )

  }


  return (
    <div className="container">
      <div className="registration-box">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Surname</label>
            <input type="text" name="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <label>Name and Surname of relative of applicant</label>
            <input type="text" name="n_s_relative" placeholder="Name and Surname of relative" value={rsurname} onChange={(e) => setRsurname(e.target.value)} />
            <label>Type of relation</label>
            <input type="text" name="relation" placeholder="Type of relation" value={typeofr} onChange={(e) => setTypeofr(e.target.value)} />
            <label>Age</label>
            <input type="number" name="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <label>Date of birth</label>
            <input type="date" name="dob" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} />
            <label>Gender</label>
            <select name="gender" value={genderSelected} onChange={(e) => setGenderSelected(e.target.value)}>
              <option value="Select Gender">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>
            <label>Address</label>
            <label>House No</label>
            <input type="text" name="house_no" placeholder="House No" value={house_no} onChange={(e) => setHouse_no(e.target.value)} />
            <label>Street/Area/Locality</label>
            <input type="text" name="street" placeholder="Street/Area/Locality" value={street} onChange={(e) => setStreet(e.target.value)} />
            <label>Town/Village</label>
            <input type="text" name="town" placeholder="Town/Village" value={city} onChange={(e) => setCity(e.target.value)} />
            <label>Pincode</label>
            <input type="text" name="pincode" placeholder="Pincode" value={pin} onChange={(e) => setPin(e.target.value)} />
            <label>State</label>
            <select name="state" value={stateSelected} onChange={selectStateHandler}>
              <option value="Select State">Select State</option>
              {data[0].states.map((state, index) => {
                return <option key={index} value={state.state}>{state.state}</option>
              })}
            </select>
            <label>District</label>
            <select name="district" value={districtSelected} onChange={(e) => setDistrictSelected(e.target.value)}>
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