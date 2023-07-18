import styles from "./InputFoto.module.css";

const InputFoto = ({
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
  label,
  readOnly,
  icon,
  onClick,
  onKeyUp,
  error,
  ref,
  className,
}) => {
  return (
    <div className={styles.inputBox}>
      <label
        className={className}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          ref={ref}
          className={className}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          readOnly={readOnly ? true : false}
        />
        {icon && (
          <button className={styles.iconButton} onClick={onClick}>
            <img src={icon} alt="" className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputFoto;
