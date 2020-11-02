export function debounce (func,delay) {
  //timer 表示计时器,定时器
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}

