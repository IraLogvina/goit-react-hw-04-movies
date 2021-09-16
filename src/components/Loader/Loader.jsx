import React from "react";
import LoaderComponent from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <LoaderComponent
        type="BallTriangle"
        color="white"
        height={120}
        width={120}
        timeout={2000}
      />
    </div>
  );
}
