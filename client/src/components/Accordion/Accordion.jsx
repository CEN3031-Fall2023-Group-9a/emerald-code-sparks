import React, { useState } from 'react';
import Open from "../../assets/icons8-collapse-arrow-30_OPEN.png"
import Closed from "../../assets/icons8-collapse-arrow-30_CLOSED.png"
import './Accordion.less';

/*  accordion component function */
export default function Accordion ({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  /* opening and closing of accordion depends on isActive */
  /* onKeyDown - fixing code smell*/
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)} onKeyDown={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <img src={isActive ? Open : Closed} alt={isActive ? "Open" : "Closed"} />
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};