const simpleRouter = require('./simpleRouter')

const uiRouter = (index = '/', history = null) => {
  const window = typeof window !== 'undefined' ? window : {}
  const listeners = []
  
  function go(toRoute, replace = false) {
    if( history && replace ) {
      history.replace(toRoute)
    } else if( history ) {
      history.push(toRoute)
    } else {
      window.location.hash = toRoute
    }
    
    notifyListeners()
    return get()
  }
  
  function get() {
    const locString = !history ? window.location.hash : history.location.pathname
    
    const current = locString.slice(1)
    return current.length > 0 ? current : index
  }
  
  function isActive(route) {
    return get() === route
  }
  
  function listen(listener) {
    listeners.push(listener)
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
  
  function notifyListeners() {
    const current = get()
    listeners.forEach(listener => listener(current))
  }
  
  if( history ) {
    history.listen(notifyListeners)
  } else {
    window.onhashchange = notifyListeners
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

module.exports = {
  UIRouter: uiRouter,
  simpleRouter: simpleRouter
}