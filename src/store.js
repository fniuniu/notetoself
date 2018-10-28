const STORAGE_KEY = 'sticky-vuejs'
export default {
  fetch() {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  //watch 所监听的函数名stickiesArray
  save(stickiesArray) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(stickiesArray))
  }
}