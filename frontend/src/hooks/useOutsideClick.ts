import { useEffect } from "react";

const useOutsideClick = (ref: any, condition: any, callback: any) => {
  const handleClick = (e: any) => {
    if (condition && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
