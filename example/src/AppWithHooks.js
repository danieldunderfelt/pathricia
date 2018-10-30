import React from 'react'
import { useRouter } from '../../packages/react-pathricia/src'
import { TabWrapper, Tab, TabContent } from './style'

const tabs = [
  { label: 'Tab one', path: '/tab' },
  { label: 'Tab two', path: '/tab/tab-two' },
  { label: 'Tab three', path: '/tab/tab-two/tab-three' },
]

export default () => {
  const [currentTab, go] = useRouter('/tab')

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
      {currentTab && (
        <TabContent>
          You selected {tabs.find(t => t.path === currentTab).label}
        </TabContent>
      )}
    </TabWrapper>
  )
}
