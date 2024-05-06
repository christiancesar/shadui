"use client"
import React from 'react';
import Select from 'react-select';
interface MultSelectProps {
  value: string;
  label: string;
}
const MultSelect = React.forwardRef<HTMLSelectElement, MultSelectProps[]>(({...props}) => {
  return (    
    <Select
      options={props}
    />
  );
});
MultSelect.displayName = 'MultSelect';

export default MultSelect;

