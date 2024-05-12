import React, { useState, useEffect } from 'react';
import './CSS/Details.css';
import { useAlert } from '../Components/Alerts/Alerts';
const Details = () => {
  const showAlert=useAlert();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    mobile: "",
    state: "",
    district: "",
    pincode: "",
    landmark: "",
  });


  


  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  async function updateAddress() {
    for (const key in formData) {
      if (!formData[key]) {
        showAlert(`${key} can't be empty`, "warning");
        return; // Stop execution if any field is empty
      }
    }
    await fetch('http://localhost:4000/details', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json())
    .then((data)=>{
      if(data.success){
        window.location.href="/Cart";
      }
    })
    ;
  }


  return (
    <div className='container'>
      <div className="content">
        <label className="input-container">
          Name:
          <input
            className="input-field"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            type="text"
            placeholder='Your Name'
          />
          <label className="input-label" htmlFor="text">Name</label>
        </label>

        <label className="input-container">
          Email:
          <input
            className="input-field"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Your Email'
          />
          <label className="input-label" htmlFor="text">Email</label>
        </label>

        <label className="input-container">
          Mobile:
          <input
            className="input-field"
            name="mobile"
            value={formData.mobile}
            onChange={changeHandler}
            type="number"
            placeholder='Your Mobile No'
          />
          <label className="input-label" htmlFor="text">Mobile</label>
        </label>

        <label className="input-container">
          Address1:
          <textarea
            className="input-field"
            name="address1"
            value={formData.address1}
            onChange={changeHandler}
            type="text"
            placeholder='Your address1'
          />
          <label className="input-label" htmlFor="text">Address1</label>
        </label>

        <label className="input-container">
  Address2:
  <textarea
    className="input-field"
    name="address2"
    value={formData.address2}
    onChange={changeHandler}
    type="text"
    placeholder='Your address2'
  />
  <label className="input-label" htmlFor="text">Address2</label>
</label>

<label className="input-container">
  State:
  <input
    className="input-field"
    name="state"
    value={formData.state}
    onChange={changeHandler}
    type="text"
    placeholder='eg tamilnadu'
  />
  <label className="input-label" htmlFor="text">State</label>
</label>

<label className="input-container">
  District:
  <input
    className="input-field"
    name="district"
    value={formData.district}
    onChange={changeHandler}
    type="text"
    placeholder='eg erode'
  />
  <label className="input-label" htmlFor="text">District</label>
</label>

<label className="input-container">
  Pincode:
  <input
    className="input-field"
    name="pincode"
    value={formData.pincode}
    onChange={changeHandler}
    type="text"
    placeholder='eg 638315'
  />
  <label className="input-label" htmlFor="text">Pincode</label>
</label>

<label className="input-container">
  Landmark:
  <input
    className="input-field"
    name="landmark"
    value={formData.landmark}
    onChange={changeHandler}
    type="text"
    placeholder='Your Landmark'
  />
  <label className="input-label" htmlFor="text">Landmark</label>
</label>

 </div>
      <button onClick={updateAddress} className='submitbutton'>submit</button>
    </div>
  );
};




export default Details;
