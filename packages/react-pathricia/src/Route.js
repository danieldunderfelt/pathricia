import React, { useContext } from 'react'
import { useRouter } from './useRouter'

export const Route = ({ path, basePath, children }) => {
  const [currentPath] = useRouter(basePath)
  
  if (path === currentPath) {
    return children
  }

  return null
}
