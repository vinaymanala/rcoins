// User.tsx
import React, { useEffect, useState } from "react";

const User: React.FC = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/apii/user")
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, []);

  return <div>{name ? `Hello, ${name}` : "Loading..."}</div>;
};

export default User;
