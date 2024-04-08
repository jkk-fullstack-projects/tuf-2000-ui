import React from "react";
import styles from "./ControlButtons.module.css";

/**
 * Displays control buttons for calendar visibility, and font size adjustment.
 */

const ControlButtons = ({
    handleCalendarVisibility,
    isCalendarVisible,
    increaseFontSize,
    decreaseFontSize,
}) => {
  return (
    <div className={styles.buttonContainer}>
        <button onClick={handleCalendarVisibility} className={styles.controlButton}>
            {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'}
        </button>
        <button 
            onClick={increaseFontSize} 
            className={styles.controlButton}>A+
        </button>
        <button 
            onClick={decreaseFontSize} 
            className={styles.controlButton}>A-
        </button>
    </div>
  );
};

export default ControlButtons;
