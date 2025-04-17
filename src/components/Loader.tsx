import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-32">
      <FaSpinner
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
          color: "var(--color-fg)",
        }}
        className="animate-spin text-blue-500 text-4xl"
      />
    </div>
  );
};

export default Loader;
