import { useRef, useEffect } from "react";
export const useEffectOnce = (effectCb: React.EffectCallback) => {
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      effectCb();
      didRun.current = true;
    }
  });
};

export const useDebounce = (cb: () => void, delay: number): Function => {
  let timer: any = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb(), delay);
  };
};
