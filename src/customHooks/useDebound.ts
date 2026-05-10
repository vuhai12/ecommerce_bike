import { useEffect, useState } from "react";

export const useDebound = (search: string, time: number) => {
  const [deboundValue, setDeboundValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundValue(search);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [search, time]);

  return deboundValue;
};
