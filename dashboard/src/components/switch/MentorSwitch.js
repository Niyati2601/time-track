import React, { useState, useCallback } from 'react';
import Switch from '@mui/material/Switch'; // Import Switch from your UI library

const MentorSwitch = ({ isMentor, onChange }) => {
  const [checked, setChecked] = useState(isMentor);

  const handleToggle = useCallback(
    async (event) => {
      const newIsMentor = event.target.checked;
      setChecked(newIsMentor); // Update local state immediately
      await onChange(newIsMentor); // Call the parent function
    },
    [onChange]
  );

  return (
    <Switch
      checked={checked}
      onChange={handleToggle}
      color="primary"
    />
  );
};

export default MentorSwitch;