import debounce from 'lodash/debounce'

const PageScrollDirective = {
  mounted(element, binding) {
    element.__PageScroll__ = debounce(binding.value, 200, { leading: true })
    document.addEventListener('scroll', element.__PageScroll__)
  },
  unmounted(element) {
    document.removeEventListener('scroll', element.__PageScroll__)
  },
}

export default (app) => {
  app.directive('page-scroll', PageScrollDirective)
}
