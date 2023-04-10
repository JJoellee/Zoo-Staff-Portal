import React from 'react';
import './StaffMember.css';

function StaffMember({ ssn, firstName, lastName, phoneNumber, email }) {
    return (
      <div className='staff-member'>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>SSN: {ssn}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Email: {email}</p>
      </div>
    );
  }

export default StaffMember;
  