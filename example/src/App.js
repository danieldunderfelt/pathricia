import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import styled from 'styled-components'
import UIRouter from './UIRouter'
import createHistory from 'history/createBrowserHistory'

const TabWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
`

const Tab = styled.button`
  padding: 1em;
  appearance: none;
  background: ${({ selected = false }) => selected ? '#0080FF' : '#1034A6' };
  border: 0;
  color: white;
  outline: none;
  cursor: pointer;
  margin-right: 2px;
  font-size: 1.2em;
  flex: 1 1 auto;
  font-weight: 700;
  transition: color .15s ease;
  text-transform: uppercase;
  
  &:hover {
    color: white;
  }
  
  &.tab-position-right {
    float: right;
  }
`

const TabContent = styled.div`
  padding: 1em;
  margin-top: 1em;
`

const SelectRouter = styled.div`
  margin-bottom: 2em;
  padding: 1em;
  border-bottom: 1px solid #efefef;
`

class TabBar extends Component {
  
  constructor() {
    super()
  
    this.tabState = observable({
      tabs: [
        { label: 'Tab one', name: 'tab1' },
        { label: 'Tab two', name: 'tab2' },
        { label: 'Tab three', name: 'tab3' },
      ],
      selectedTab: 'tab1',
      selectedRouter: 'hash'
    })
  
    const setTab = action(tabName => {
      this.tabState.selectedTab = tabName
    })
    
    this.setRouter = action(routerType => {
      this.tabState.selectedRouter = routerType
    })
  
    let routerListener = null
    this.router = null
    
    // Switch the routers
    reaction(() => this.tabState.selectedRouter, router => {
      if(routerListener !== null) {
        routerListener() // Remove the listener
      }
      
      this.router = router === 'hash' ?
        UIRouter('tab1') :
        UIRouter('tab1', createHistory())
      
      routerListener = this.router.listen(setTab)
    }, true)
  }
  
  render() {
    const { tabs, selectedTab, selectedRouter } = this.tabState
    
    return (
      <TabWrapper>
        <SelectRouter>
          <label>
            <input
              onChange={ () => this.setRouter('hash') }
              value="hash"
              name="router"
              checked={ selectedRouter === 'hash' }
              type="radio" /> Use hash router
          </label>
          <label>
            <input
              onChange={ () => this.setRouter('history') }
              value="history"
              name="router"
              checked={ selectedRouter === 'history' }
              type="radio" /> Use history router
          </label>
        </SelectRouter>
        <div>
          { tabs.map(tab => (
            <Tab
              selected={ selectedTab === tab.name }
              onClick={ () => this.router.go(tab.name) }
              key={ `tab_item_${ tab.name }` }>
              { tab.label }
            </Tab>
          )) }
        </div>
        <TabContent>
          You selected { tabs.find(t => t.name === selectedTab).label }
        </TabContent>
      </TabWrapper>
    )
  }
}

export default observer(TabBar)