import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

export default {
  /**
   * @param {import('vue').App} app
   */
  install: (app) => {
    const format = {
      /**
       * Formats a date from now
       *
       * @param {String} timestamp
       * @returns {string}
       */
      fromNow(timestamp) {
        return dayjs.unix(timestamp).fromNow()
      },
      /**
       * Formats a date
       *
       * @param {String} timestamp
       * @returns {string}
       */
      date(timestamp) {
        return dayjs.unix(timestamp).format('llll')
      },
    }

    const utils = {
      format,
    }

    app.config.globalProperties.$utils = utils
  },
}
