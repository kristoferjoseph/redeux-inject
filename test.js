var test = require('tape')
var Injector = require('./')
var store = require('redeux')(things, stuff)
Injector(store)
function things (state, action) {
  return {
    things: 'things',
    stuff: {
      other: 'stuff'
    }
  }
}
function stuff (state, action) {
  return {
    stuff: 'stuff',
    things: {
      other: 'things'
    }
  }
}

test('Injector', t=> {
  t.ok(Injector, 'exists')
  t.end()
})

test('inject', t=> {
  t.ok(Injector.inject, 'exported')
  t.end()
})

test('should inject state', t=> {

  function model (state) {
    return {
      one: state.stuff.things.other
    }
  }

  function component (state) {
    t.equal(state.one, 'things')
    t.end()
  }

  Injector.inject(model)(component)

})

test('dispatch', t=> {
  t.ok(Injector.dispatch, 'exported')
  t.end()
})

test('should inject dispatch', t=> {

  function callit (dispatch) {
    t.ok(dispatch, 'dispatch injected')
    t.end()
  }

  Injector.dispatch(callit)

})
