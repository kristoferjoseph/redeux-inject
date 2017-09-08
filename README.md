# redeux-inject
A tiny [redeux](https://github.com/kristoferjoseph/redeux) dependency injector 💉

This module exposes two functions:
  - `inject`
  - `dispatch`

These allow you to parse state and dispatch actions without having to pass data through layers of components.

## install

`npm i redeux-inject --save`

## usage

```
// Initialize
var Injector = require('redeux-inject')
var store = require('redeux')(things)
Injector(store)
// contrived reducer function
function things (state, action) {
  return {
    things: 'things',
    stuff: {
      other: 'stuff'
    }
  }
}

// Inject
function component (state) {
  var one = state.things.stuff.other
  console.log(one) // 'stuff'
}

Injector.inject(component)

// Dispatch
function callit (dispatch) {
  dispatch('DO A THING')
}

Injector.dispatch(callit)
```
