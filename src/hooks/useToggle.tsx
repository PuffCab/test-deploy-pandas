import React, { useState } from "react";

type HookReturn = [string, () => void];

function useToggle(value1: string, value2: string): HookReturn {
  const [toggleValue, setToggleValue] = useState(value1);

  const changeToggle = () => {
    if (toggleValue === value1) {
      setToggleValue(value2);
    }
    if (toggleValue !== value1) {
      setToggleValue(value1);
    }
  };

  return [toggleValue, changeToggle];
}

export default useToggle;
