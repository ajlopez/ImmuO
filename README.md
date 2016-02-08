# ImmuO

Immutable objects in JavaScript

## Installation

Via npm on Node:

```
npm install immuo
```

In your browser:
TBD

## Usage

Reference in your program
```javascript
var immuo = require('immuo');
```

Reference in your browser
TBD

Create an immutable object:

```
var state = immuo();
```

Setting a property returns the new immutable object:
```
var newstate = state.set('name', 'Adam');
console.log(newstate.name); // 'Adam'
console.log(state.name); // undefined
```

Setting a property (nested or not) returns the new top immutable object
```
var state = immuo();
var newstate = state.set('person', {});
newstate = newstate.person.set('name', 'Adam');
newstate = newstate.person.set('age', 800);

console.log(newstate.person.name); // 'Adam'
console.log(newstate.person.age);  // 800
```

The properties are immutable:
```
var state = immuo();
var newstate = state.set('person', {});
newstate.person = { name: 'Adam' }; // invalid operation!!!
```

You can get a cloned detached object, and modify it:

```
var state1 = immuo();
var state2 = state1.set('person', {});

// cloned and detached person
var person = state2.person.get();

// now, each set returns a new person, not a new state
var newperson = person.set('name', 'Adam')
    .set('age', 800)
    .set('wife', 'Eve');
    
// attach to state
var state3 = state2.set('person', newperson);
```


## Samples

TBD

## Versions

- 0.0.1 Published
- 0.0.2 Published, using Object.defineProperty, immutable properties
- 0.0.3 Published, .get method for detached object

## To do

Native array support.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/ImmuO) and submit
[pull requests](https://github.com/ajlopez/ImmuO/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

