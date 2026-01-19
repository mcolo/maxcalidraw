export default function throttle(func: Function, wait = 250) {
  let timeoutId: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timeoutId) return;
    // @ts-ignore
    func.apply(this, args);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, wait);
  };
}
