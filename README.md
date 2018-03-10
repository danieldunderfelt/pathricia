# UI-Router

This is a very simple implementation of a router, that is nevertheless fully functional. I have personally used it in various client projects and it has been a pleasure!

This package exports the UI Router, which can be used with the history API or without. If you don't give it an instance of a history, it will just use the `location.hash` and work splendidly.

Essentially, it's an abstraction for the current location, be it hash-based or history-based.

## Hash example

This is an example of a tab UI that uses the hash for routing AND is connected to your favorite state manager:

```jsx harmony
const { UIRouter } = require('ui-router')

const state = { currentTab: 'lions' }
 
function activateTab(tabName) {
  // Dispatch state change
  state.currentTab = tabName
}

// Instantiate a router and set the index route
// which is what get() will return when the hash is empty.
const router = UIRouter('lions')

// Listen to changes in the url
router.listen(activateTab)

<TabBar
  tabs={[
    { name: 'lions', label: 'Lions' },
    { name: 'tigers', label: 'Tigers' }
  ]}
  onSelect={ tab => router.go(tab.name) }
  selectedTab={ state.currentTab } />
```

## History example

This is an example of the same tab UI that uses a Browser History instance for routing AND is connected to your favorite state manager. it's on you to install and instantiate a history object, which the router factory accepts its second argument.

`yarn add history`

```jsx harmony
const { UIRouter } = require('ui-router')
const createHistory = require('history/createBrowserHistory')

const state = { currentTab: 'lions' }
 
function activateTab(tabName) {
  // Dispatch state change
  state.currentTab = tabName
}

const browserHistory = createHistory()

// Instantiate a router and set the index route
// which is what get() will return when the hash is empty.
const router = UIRouter('lions', browserHistory)

// Listen to changes in the url
router.listen(activateTab)

<TabBar
  tabs={[
    { name: 'lions', label: 'Lions' },
    { name: 'tigers', label: 'Tigers' }
  ]}
  onSelect={ tab => router.go(tab.name) }
  selectedTab={ state.currentTab } />
```


## Usage

The UIRouter is a factory function that returns an object with six methods: `go`, `get`, `isActive`, `back`, `forward` and `listen`. The factory accepts two arguments, the first of which is the `index` an the second being the `history` instance you wish to use. If you don't provide an instance of a history, the router will work just fine with `location.hash`.

In fact, this router was designed to be used with only `location.hash`, so don't feel like you're missing out if you don't provide a history! The only real difference is that the `back` and `forward` methods will not work in hash-only mode. This might change in the future, but I need to keep track of the history manually, so I'll save it for a future release.

Register a route change listener by calling the `listen` method with a function. The callback will be called with the new route each time the route changes. You can easily hook this up into your state manager, as shown above. If you call the function thar is returned, you'll deregister your listener callback.

The central methods you'll use the most is the `go` and the `get` methods. The `go(toRoute)` method sets the location to be what you passed as `toRoute`, and then call all listeners. If you are using history, you can also pass a second `replace` parameter to `go()`, in which case the route will replace the current route.

The `get()` method just returns what the current route is. If there is no current route, `get()` will return what you passed the router factory as the `indexRoute` argument. Easy peasy.

## Examples and usage ideas

### React app example

Check the example folder for a quick React-based example with tabs.

### Use in conditionals

If all you want is to check what the current route is, you can do this:

```js
/* will return false if you are NOT where you are checking. */
const router = Router(false)

if(router.get() === 'route') {
  console.log(`at route example.com/#route`)
}

// Or alternatively

if(router.isActive('route')) {
  console.log(`at route example.com/#route`)
}

```

Note that the router won't do anything unless you call a method, so just calling the factory will not cause any overhead more than a simple function call. The route change listener is dynamically enabled and disabled when you add or remove listeners. If you have a need for many different "index routes", you can just conjure up as many routers as you want.