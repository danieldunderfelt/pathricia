import styled from 'styled-components'

export const TabWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  font-family: 'Helvetica', Arial, sans-serif;
`

export const Tab = styled.button`
  padding: 1em;
  appearance: none;
  background: ${({ selected = false }) => (selected ? '#0080FF' : '#1034A6')};
  border: 0;
  color: white;
  outline: none;
  cursor: pointer;
  margin-right: 2px;
  font-size: 1.2em;
  flex: 1 1 auto;
  font-weight: 700;
  transition: color 0.15s ease;
  text-transform: uppercase;

  &:hover {
    color: white;
  }

  &.tab-position-right {
    float: right;
  }
`

export const TabContent = styled.div`
  padding: 1em;
  margin-top: 1em;
`
