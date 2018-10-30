import React, { useEffect, useState } from 'react'
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'
import { TabWrapper, Tab, TabContent } from './style'

function useRouter(index = '/') {
  const router = Router(index, createHistory())
  const [currentRoute, setRoute] = useState(index)

  useEffect(() => router.listen(setRoute))

  return [currentRoute, router.go, router.back, router.forward]
}

const tabs = [
  { label: 'Tab one', path: '/tab' },
  { label: 'Tab two', path: '/tab/tab-two' },
  { label: 'Tab three', path: '/tab/tab-two/tab-three' },
]

export default () => {
  const [currentTab, go] = useRouter('/')

  return (
    <TabWrapper>
      <div>
        {tabs.map(tab => (
          <Tab
            selected={currentTab === tab.path}
            onClick={() => go(tab.path)}
            key={`tab_item_${tab.path}`}>
            {tab.label}
          </Tab>
        ))}
      </div>
      {currentTab && <TabContent>You selected {currentTab.label}</TabContent>}
    </TabWrapper>
  )
}
