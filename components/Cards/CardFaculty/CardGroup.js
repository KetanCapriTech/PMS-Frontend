import React from "react";

const CardGroup = ({ group }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">{group.name}</h2>
      <p className="mt-2">{group.description}</p>
    </div>
  );
};

export default CardGroup;
