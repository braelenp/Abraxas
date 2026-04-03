import { useEffect } from 'react'

/**
 * Hook to scroll to top of page when component mounts
 * or when dependencies change
 */
export const useScrollToTop = (dependencies: any[] = []) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, dependencies)
}

export default useScrollToTop
