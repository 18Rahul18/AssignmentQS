import React from "react";

const UserIcon = ({ name }) => {
  const getInitials = (name) => {
    const namesArray = name.split(" ");
    const initials = namesArray
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return initials;
  };

  return <div style={styles.circle}>{getInitials(name)}</div>;
};

const styles = {
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#87A96B",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
  },
};

export default UserIcon;
