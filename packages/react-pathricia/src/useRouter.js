import { useState, useEffect, useContext } from 'react'
import { createHistory } from 'history'
import { Router } from '../../pathricia/src'
import BasePathContext from './BasePath'

export function useRouter(index) {
  const contextBasePath = useContext(BasePathContext)
  const basePath = typeof index === 'string' && !!index ? index : contextBasePath

  const router = Router(basePath, createHistory())
  const [currentRoute, setRoute] = useState(basePath)

  useEffect(() => router.listen(setRoute))

  return [currentRoute, router.go, router.back, router.forward]
}
