import localizeFilter from '../filters/localizeFilter.js'
export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
        const appName = 'Dmitries CRM'
        return `${localizeFilter(titleKey)} | ${appName}`
    }
  },
}
