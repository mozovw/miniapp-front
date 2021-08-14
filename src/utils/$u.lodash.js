const install = (Vue, vm) => {
  var lodash = require('lodash')
  vm.$u.lodash = lodash
}

export default {
  install
}
