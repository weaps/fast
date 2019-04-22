export function debounce(fn, delay) {
  return args => {
    // debugger;
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(this, args)
      window.console.log('a')
    }, delay)
  }
}