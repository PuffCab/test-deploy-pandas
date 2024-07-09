import { useEffect, useState } from "react";

type HookReturn = {
  countDownMessage: string;
};

function useCountDown(countDownTime: number): HookReturn {
  const [countDownMessage, setCountDownMessage] = useState(
    `a ${countDownTime / 1000} ⏱️ started`
  );
  useEffect(() => {
    if (typeof countDownTime === "number") {
      setTimeout(() => {
        setCountDownMessage("TIME UP!!!");
      }, countDownTime);
    } else {
      setCountDownMessage("only numbers are allowed");
    }
  }, [countDownTime]);

  return { countDownMessage };
}

export default useCountDown;
