import { useEffect } from "react";

export function useEffectCustom(callback: () => void, dependencies?: any[]) {
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      callback();
    }
    return () => {
      ignore = true;
    };
  }, dependencies);
}
