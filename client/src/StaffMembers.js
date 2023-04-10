import React, { useEffect, useState } from 'react';
import StaffSearchForm from './StaffSearchForm';
import StaffSearchResults from './StaffSearchResults' ;

function StaffMembers() {

  const [currstaffType, setCurrstaffType] = useState('caretaker');

  const handleSearch = (staffType) => {

    setCurrstaffType(staffType);

    console.log(`Searching for staff members of type ${staffType}`);
  };
  return (
    <div>
  
    <StaffSearchForm handleSubmit={handleSearch}/>
    <StaffSearchResults staffType={currstaffType}/>
    
  </div>
  )
}

export default StaffMembers;
