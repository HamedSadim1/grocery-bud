import { useEffect } from "react";
import { Errors, ILIST } from "../types";

interface AlertProps {
  alert: Errors;
  showAlert: (show: boolean, type: string, msg: string) => void;
  list: ILIST[];
}

/**
 * Alert component displays a message for a specified duration.
 *
 * @param {AlertProps} props - The props object containing the alert, showAlert, and list properties.
 * @returns {JSX.Element} The rendered Alert component.
 */
const Alert = ({ alert, showAlert, list }: AlertProps) => {
  const { type, msg } = alert;
  useEffect(() => {
    console.log("alert");
    const timeout = setTimeout(() => {
      showAlert(false, "", "");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list, showAlert]);
  return (
    <div className={`alert alert-${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
