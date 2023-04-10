import React, { useEffect, useState } from 'react';
import StaffMember from './StaffMember';

function StaffSearchResults({ staffType }) {
  const [staffMembers, setStaffMembers] = useState([]);
  const [staffTable, setStaffTable] = useState('');

  useEffect(() => {
      fetch(`http://localhost:5000/api/staff?type=${staffType}`)
        .then((response) => response.json())
        .then((data) => {
          setStaffMembers(data.results);
          setStaffTable(data.table);
        })
        .catch((error) => console.error(error));
    
  }, [staffType]);

  return (
    <div>
      <h1>Staff Members ({staffTable})</h1>
      {staffMembers.length > 0 ? (
        staffMembers.map((staff) => (
          <StaffMember
            key={staff.ssn}
            ssn={staff.ssn}
            firstName={staff.first_name}
            lastName={staff.last_name}
            phoneNumber={staff.phone_number}
            email={staff.email}
          />
        ))
      ) : (
        <p>No staff members found.</p>
      )}
    </div>
  );
}

export default StaffSearchResults;
