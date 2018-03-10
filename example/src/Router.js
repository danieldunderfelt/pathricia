// I HATE TO HAVE TO COPY THIS HERE

module.exports = (index = '/', history = null) => {
  const listeners = []
  let isListening = false
  let historyUnlisten = null
  
  function go(toRoute, replace = false) {
    if( history && replace ) {
      history.replace(toRoute)
    } else if( history ) {
      history.push(toRoute)
    } else {
      window.location.hash = toRoute
    }
    
    return get()
  }
  
  function get() {
    const locString = !history ? window.location.hash : history.location.pathname
    const current = !history ? locString.slice(1) : locString
    
    return current.length > 0 ? current : index
  }
  
  function isActive(route) {
    return get() === route
  }
  
  function back() {
    if( history ) {
      history.goBack()
    }
  }
  
  function forward() {
    if( history ) {
      history.goForward()
    }
  }
  
  function listen(listener) {
    listeners.push(listener)
    
    if( listeners.length > 0 ) {
      _startListening()
    }
    
    return _unlisten(listener)
  }
  
  function _unlisten(listener) {
    
    return () => {
      const idx = listeners.findIndex(registeredListener => registeredListener === listener)
      
      if( idx > -1 ) {
        listeners.splice(idx, 1)
      }
      
      if( listeners.length === 0 ) {
        _stopListening()
      }
    }
  }
  
  function notifyListeners() {
    const current = get()
    listeners.forEach(listener => listener(current))
  }
  
  function _startListening() {
    if( isListening ) return
    
    if( history ) {
      historyUnlisten = history.listen(notifyListeners)
    } else {
      window.addEventListener('hashchange', notifyListeners)
    }
    
    isListening = true
  }
  
  function _stopListening() {
    if( !isListening ) return
    
    if( history && typeof historyUnlisten === 'function' ) {
      historyUnlisten()
      historyUnlisten = null
    } else {
      window.removeEventListener('hashchange', notifyListeners)
    }
    
    isListening = false
  }
  
  return {
    go,
    get,
    back,
    forward,
    isActive,
    listen
  }
}