1-8-2021

Container Pattern: 'Component that gets wrapped with all the Higher Order Component it needs, in order to properly run the contained components'

The process of determining whether the collections are loading or not should be handled within the collection components themselves, not within the parent: Shop component. Components should be as dumb as possible, the Shop doesn't need to find out what the collection components need. Because we have multiple components we are going to use "Container Pattern"

- Containers don't render anything, they just pass props down to components \*

|--- THUNK ---|

A middleware that allows 'Actions' run as asynchronous functions and dispatch actions to the reducer. In our 'fetchCollectionStartAsync' Thunk, we can dispatch 3 actions, the 'fetchCollectionsStart', 'fetch...Success', or 'fetch...Failure'. The function will see the first dispatch and send that action to the reducer, then it calls our 'get' to the Firestore, waits for the data to return, then fires the second dispatch if it succeeds or the Failure dispatch if it fails.

|--- SAGA ---|

A function that conditionally runs, based on what action is coming into the saga middleware.

A dispatch sends an action to the reducer (idk if the reducer runs the action or sends it to Sagas ), then send the action to the Saga. The Saga can then send new actions to the reducer, and so on...

'Side-Effects' - either API calls to the backend (async code) OR something that triggers an impure reaction.

'Pure Function' - A function that returns the same result when given the same arguments/values.

'Generators' - ES6 - functions that can be stopped and continued, instead of executing all expresions in a single step. When called it returns an iterator object, with each call to the iterator's 'next()' method. The body of the generator function executes until the next yield expression and then stops.

e.g.

---

    function* generatorFunction() { yield 'First value'; yield 'Second value'; return 'Third value'; } const iteratorObject = generatorFunction(); console.log(iteratorObject.next()) //{value: "First value", done: false} console.log(iteratorObject.next()) //{value: "Second value", done: false} console.log(iteratorObject.next()) // {value: "Third value", done: true} console.log(iteratorObject.next()) // {value: "undefined, done: true}

---

Async. e.g.

---

    try {
    const successResponse = yield fetch('url');`
    const parsedResponse = yield successResponse.json();`
    console.log(successResponse);
    } catch(error) {
    console.log(error)
    }

'Generator Functions are similar to Async/Await where you perform an operation, then "await" the return of a Promise-based event. Generator Functions pause when they see a certain key called a "Yield" '

When we invoke a Gen. function we return a "Generator Object" {}

declare gen. function:

    function* gen() {
    console.log('a');
    console.log('b');
    }
    // undefined

save returned object to a variable

    const g = gen()
    // undefined

return g

    g
    // gen {<suspended>}

g does not perform the console.logs because it is 'suspended' we must call .next()

    g.next()
    // a
    // b
    // {value: undefined, done: true}


    function* gen(i) {
    yield i;
    yield i + 10;
    }
    undefined
    const g = gen(5)
    VM1907:1 Uncaught SyntaxError: Identifier 'g' has already been declared
    const gg = gen(5)
    undefined
    const ggObject = gg.next()
    undefined
    ggObject
    {value: 5, done: false}done: falsevalue: 5__proto__: Object
    const gggObject = gg.next()
    undefined
    gggObject
    {value: 15, done: false}
    gg.next()
    {value: undefined, done: true}

---

import 'Effects' from sagas to perform actions (e.g. create or listen)

'takeEvery' - Listens for every action of a specific type. It allows us to perform an asynchronous request without 'blocking' our app from running js code. we can perform other actions or Sagas meanwhile. We yield control of this action to the middleware. If we receive another takeEvery action type, the middleware can determine whether to cancel the previous action/other actions
