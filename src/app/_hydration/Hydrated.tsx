"use client";

import { useEffect, useState } from "react";

const Hydrated = ({ children }: { children: React.ReactNode }) => {
  const [hydration, setHydration] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);
  return hydration ? children : <div></div>;
};

export default Hydrated;
