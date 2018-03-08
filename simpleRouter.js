const listeners = []

module.exports = (index) => {
  
  function go(toRoute) {
    window.location.hash = toRoute
    notifyListeners()
    
    return get()
  }
  
  function get() {
    const current = window.location.hash.slice(1)
    return current.length > 0 ? current : index
  }
  
  function isActive(route) {
    return get() === route
  }
  
  function listen(listener) {
    listeners.push(listener)
  }
  
  function notifyListeners() {
    const cur = get()
    listeners.forEach(listener => listener(cur))
  }
  
  return {
    go,
    get,
    isActive,
    listen
  }
}