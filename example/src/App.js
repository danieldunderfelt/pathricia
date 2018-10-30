import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import styled from 'styled-components'
import { Router, SimpleRouter } from '../../packages/pathricia/src'
import createHistory from 'history/createBrowserHistory'
import { TabWrapper, TabContent, Tab } from './style'

const SelectRouter = styled.div`
  margin-bottom: 2em;
  padding: 1em;
  border-bottom: 1px solid #efefef;
`

const INITIAL_ROUTE = '/tab'

class TabBar extends Component {
  constructor() {
    super()

    this.tabState = observable({
      tabs: [
        { label: 'Tab one', path: '/tab' },
        { label: 'Tab two', path: '/tab/tab-two' },
        { label: 'Tab three', path: '/tab/tab-two/tab-three' },
      ],
      selectedTab: INITIAL_ROUTE,
      selectedRouter: 'hash',
    })

    const setTab = action(tabName => {
      this.tabState.selectedTab = tabName
    })

    this.setRouter = action(routerType => {
      this.tabState.selectedRouter = routerType
    })

    let routerListener = null
    this.router = SimpleRouter(INITIAL_ROUTE)

    // Switch the routers
    reaction(
      () => this.tabState.selectedRouter,
      router => {
        if (typeof routerListener === 'function') {
          routerListener() // Remove the listener
        }

        switch (router) {
          case 'hash':
            this.router = Router(INITIAL_ROUTE)
            break
          case 'history':
            this.router = Router(INITIAL_ROUTE, createHistory())
            break
          case 'simple':
            this.router = SimpleRouter(INITIAL_ROUTE)
        }

        routerListener = this.router.listen(setTab) // Add the listener
        setTab(this.router.get()) // Update the current location from the new router
      },
      { fireImmediately: true }
    )
  }

  render() {
    const { tabs, selectedTab, selectedRouter } = this.tabState
    const currentTab = tabs.find(t => t.path === selectedTab)

    return (
      <TabWrapper>
        <h2>Pathricia</h2>
        <p>
          This is an example of how to use the Pathricia Router in React. Peek into
          the <code>example/src/App.js</code> file to see how it's wired up!
        </p>
        <p>
          To demonstrate how to use the hash-based setup and the history based setup,
          you can switch between the two with these controls. Obviously you'd use
          either one in a real app, not both.
        </p>
        <SelectRouter>
          <label>
            <input
              onChange={() => this.setRouter('hash')}
              value="hash"
              name="router"
              checked={selectedRouter === 'hash'}
              type="radio"
            />{' '}
            Use hash router
          </label>
          <br />
          <label>
            <input
              onChange={() => this.setRouter('history')}
              value="history"
              name="router"
              checked={selectedRouter === 'history'}
              type="radio"
            />{' '}
            Use history router
          </label>
          <br />
          <label>
            <input
              onChange={() => this.setRouter('simple')}
              value="simple"
              name="router"
              checked={selectedRouter === 'simple'}
              type="radio"
            />{' '}
            Use simple router (hash-only)
          </label>
        </SelectRouter>
        <div>
          {tabs.map(tab => (
            <Tab
              selected={selectedTab === tab.path}
              onClick={() => this.router.go(tab.path)}
              key={`tab_item_${tab.path}`}>
              {tab.label}
            </Tab>
          ))}
        </div>
        <TabContent>You selected {currentTab ? currentTab.label : ''}</TabContent>
      </TabWrapper>
    )
  }
}

export default observer(TabBar)
