// Input.tsx
import React from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeHolder: string;
};

const Input: React.FC<InputProps> = ({ value, onChange, placeHolder }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeHolder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
