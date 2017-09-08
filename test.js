var test = require('tape')
var Injector = require('./')
var Store = require('redeux')

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
  var store = Store(stuff)
  Injector(store)
  function model (state) {
    return {
      one: state.stuff.things.other
    }
  }

  function component (state) {
    var one = state.stuff.things.other
    t.equal(one, 'things')
    t.end()
  }

  Injector.inject(component)

})

test('dispatch', t=> {
  t.ok(Injector.dispatch, 'exported')
  t.end()
})

test('should dispatch', t=> {

  var store = Store(fake)
  Injector(store)

  function fake (state, action) {
    if (action && action.type === 'ACTION') {
      t.ok(true, 'action dispatched')
      t.end()
    }
    return 'fake'
  }

  Injector.dispatch({
    type: 'ACTION',
    data: 'stuff'
  })

})
