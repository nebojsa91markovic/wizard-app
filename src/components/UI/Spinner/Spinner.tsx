import { Spinner as SpinnerIcon } from "@/assets/icons/";

interface SpinnerProps {
  width?: number;
  height?: number;
}

const Spinner = ({ width = 20, height = 20 }: SpinnerProps) => {
  return (
    <img
      src={SpinnerIcon}
      alt="Loading spinner"
      width={width}
      height={height}
    />
  );
};

export default Spinner;
