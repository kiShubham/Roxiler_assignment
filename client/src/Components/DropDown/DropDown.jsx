/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";

const DropDown = ({ monthHandler, monthBool }) => {
  const [bool, setBool] = useState(false);

  const handlebool = () => {
    if (!bool) window.alert("initialize the data first then select month");
  };
  useEffect(() => {
    setBool(monthBool);
  }, [monthBool]);

  return (
    <select
      name="pets"
      id="pet-select"
      className={styles.input}
      onChange={(e) => monthHandler(e.target.value)}
      onClick={handlebool}
    >
      <option value="month">- - select a month - -</option>
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
  );
};

export default DropDown;
