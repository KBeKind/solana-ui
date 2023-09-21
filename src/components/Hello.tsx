import styles from "./Hello.module.css";

const Hello = function () {
  return (
    <div>
      <p className={styles.helloText}>Hello World!</p>
    </div>
  );
};

export default Hello;
