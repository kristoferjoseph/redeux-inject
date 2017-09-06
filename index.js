var noop = require('noope')
var _store
var _dispatch

function Injector (store) {
  _store = store || noop
  _dispatch = store.dispatch || noop
}

function inject (model) {
  return function (component) {
    return component && component(model ? model(_store()) : _store())
  }
}

function dispatch (action) {
  action && _dispatch(action)
}

Injector.inject = inject
Injector.dispatch = dispatch
module.exports = Injector
