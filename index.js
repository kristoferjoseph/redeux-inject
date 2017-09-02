var noop = require('noope')
var store
var publish

function Injector (storage) {
  store = storage || noop
  publish = store.dispatch || noop
}

function inject (model) {
  return function (component) {
    return component(model && model(store()))
  }
}

function dispatch (fn) {
  fn(publish)
}

Injector.inject = inject
Injector.dispatch = dispatch
module.exports = Injector
