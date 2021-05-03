import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ToastClose,
  ToastHeaderUI,
  ToastMessage,
  ToastTitleUI,
  ToastUI,
} from "../../ui-components/AlertUI";

const Alert = ({ alerts }) => {
  const displayToastTitle = (statusCode) => {
    switch (statusCode) {
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not found";
      case 500:
        return "Server error";
      case 402:
        return "Payment required";
      default:
        return "Server error";
    }
  };

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <ToastUI key={alert.id} type={alert.alertType}>
        {/*<ToastClose>&#10005;</ToastClose>*/}
        <ToastHeaderUI>
          <ToastTitleUI>
            {alert.alertType === "danger" ? displayToastTitle() : "Success"}
          </ToastTitleUI>
        </ToastHeaderUI>
        <ToastMessage>{alert.msg}</ToastMessage>
      </ToastUI>
    ))
  );
};

Alert.protoTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
