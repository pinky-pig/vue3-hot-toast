/**
 * 利用闭包生成唯一 id
 */
export const genId = (() => {
  let count = 0
  return () => {
    return (++count).toString()
  }
})()

/**
 * 检测用户浏览器是否设置了“减少动态效果”。
 * 减少动画，提升可访问性，性能优化
 */
export const prefersReducedMotion = (() => {
  // Cache result
  let shouldReduceMotion: boolean | undefined

  return () => {
    if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)')
      shouldReduceMotion = !mediaQuery || mediaQuery.matches
    }
    return shouldReduceMotion
  }
})()
