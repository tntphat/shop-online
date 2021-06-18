import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handle) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handle();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handle]);
}

export default function OutsideAlerter({ children, handle }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handle);

  return <div ref={wrapperRef}>{children}</div>;
}
