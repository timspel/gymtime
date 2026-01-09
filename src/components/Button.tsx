/**
 * Button component
 * This component renders a button with customizable styling and a click functionality.
 * @param {string} className - Additional class names for styling
 * @param {string} children - The text to display inside the button
 * @param {void} onClick - Function to call when the button is clicked
 * @returns {JSX.Element} - The rendered alert component
 */

interface Props {
  children: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ className, children, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
