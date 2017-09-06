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
    t.equal(state.one, 'things')
    t.end()
  }

  Injector.inject(model)(component)

})

test('should inject state even without model', t=> {
  var store = Store(things)
  Injector(store)
  var inject = Injector.inject()

  function component (state) {
    t.equal(state.things.things, 'things')
    t.end()
  }

  inject(component)

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
