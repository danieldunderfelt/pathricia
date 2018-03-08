# UI-Router

This is a very simple implementation of a router, that is nevertheless fully functional. I have personally used it in various client projects and it has been a pleasure!

## Variants

This package exports the UI Router, which can be used with the history API or without. If you don't give it an instance of a history, it will just use the `location.hash` and work splendidly.

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

Register a route change listener by calling the `listen` method with a function. The callback will be called with the new route each time the route changes. You can easily hook this up into your state manager, as shown above. If you call the fucntion tha is returned, you'll unregister your callback.

The central methods you'll use the most is the `go` and the `get` methods. The `go(toRoute)` method sets the location to be what you passed as `toRoute`, and then call all listeners. The `get()` method just returns what the current route is. If there is no current route, `get()` will return what you passed the router factory as the `indexRoute` argument. Easy peasy.