import "./Button.css";

const Button = ({ children, className, onClick, disabled = false }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
