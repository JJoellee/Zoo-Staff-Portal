import React from 'react';
import { useState } from 'react';

function StaffSearchForm({ handleSubmit }) {
  const [staffType, setStaffType] = useState('');

  const handleSelectChange = (event) => {
    setStaffType(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(staffType);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Select a staff member type:
        <select value={staffType} onChange={handleSelectChange}>
          <option value="caretaker">Caretaker</option>
          <option value="event_manager">Event Manager</option>
          <option value="guide">Guide</option>
          <option value="janitor">Janitor</option>
          <option value="receptionist">Receptionist</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default StaffSearchForm;
