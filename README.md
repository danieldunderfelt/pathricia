# Pathricia

This is a very simple implementation of a router, that is nevertheless fully functional. I have personally used it in various client projects and it has been a pleasure! Now it is named and published.

This package exports the Pathricia Router, which can be used with the history API or without. If you don't give it an instance of a history, it will just use the `location.hash` and work splendidly.

## Install

For your copy-pasting pleasure:

`yarn add pathricia`

## Use

Import the named export `{ Router }` from the Pathricia package.

Refer to the usage example below, and have a peek into the example folder for an... uh, example.

```js
import { Router } from 'pathricia'
const router = Router('indexroute')
```

If you want to use HTML5 history, you can give it a history object:

```js
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'

const router = Router('indexroute', createHistory())
```

## Hash example

This is an example of a tab UI that uses the hash for routing AND is connected to your favorite state manager:

```jsx harmony
import { Router } from 'pathricia'

const state = { currentTab: 'lions' }
 
function activateTab(tabName) {
  // Dispatch state change
  state.currentTab = tabName
}

// Instantiate a router and set the index route
// which is what get() will return when the hash is empty.
const router = Router('lions')

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

This is an example of the same tab UI that uses a Browser History instance for routing AND is connected to your favorite state manager. It's on you to install and instantiate a history object, which the router factory accepts its second argument.

`yarn add history`

```jsx harmony
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'

const state = { currentTab: 'lions' }
 
function activateTab(tabName) {
  // Dispatch state change
  state.currentTab = tabName
}

const browserHistory = createHistory()

// Instantiate a router and set the index route
// which is what get() will return when the hash is empty.
const router = Router('lions', browserHistory)

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


## API

The Pathricia Router is a factory function that returns an object with six methods: `go`, `get`, `isActive`, `back`, `forward` and `listen`. The factory accepts two arguments, the first of which is the `index` an the second being the `history` instance you wish to use. If you don't provide an instance of a history, the router will work just fine with `location.hash`.

In fact, this router was designed to be used with only `location.hash`, so don't feel like you're missing out if you don't provide a history! The only real difference is that the `back` and `forward` methods will not work in hash-only mode. This might change in the future, but I need to keep track of the history manually, so I'll save it for a future release.

Register a route change listener by calling the `listen` method with a function. The callback will be called with the new route each time the route changes. You can easily hook this up into your state manager, as shown above. If you call the function thar is returned, you'll de-register your listener callback.

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

### Use in node (or other windowless basements)

Since the Pathricia router uses `window.location.hash`, you obviously need access to the window object to use it in hash-only mode. If you need to use this in node, just pass a MemoryHistory (or something) from the `history` package as the second argument for the factory function. Then Pathricia will not try to access the `window` at any point.

File an issue if the fact that Pathricia reads from the `window` object in becomes an issue at some point.