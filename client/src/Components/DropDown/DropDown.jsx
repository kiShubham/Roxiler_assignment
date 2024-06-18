import styles from "./DropDown.module.css";

const DropDown = () => {
  return (
    <select name="pets" id="pet-select" className={styles.input}>
      <option value="">--Please choose a month--</option>
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="march">March</option>
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
