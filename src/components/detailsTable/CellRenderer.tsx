import React from 'react';

interface CellRendererProps {
  value: unknown; // We expect the value to be `unknown`, but will handle it as a string or number
}

const CellRenderer: React.FC<CellRendererProps> = ({ value }) => {
  // Handle the value, ensure it's a string or something displayable
  const displayValue = String(value); // Or you can perform any other formatting or checks if needed

  return <i>{displayValue}</i>; // Render the value wrapped in <i> tag
};

export default CellRenderer;