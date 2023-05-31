import React, { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== undefined ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};

export default useWindowWidth;
