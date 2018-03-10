module.exports = index => {
  
  const listeners = []
  let isListening = false
  
  function go(toRoute) {
    window.location.hash = toRoute
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
    
    if(listeners.length > 0 && !isListening) {
      window.addEventListener('hashchange', notifyListeners)
      isListening = true
    }
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