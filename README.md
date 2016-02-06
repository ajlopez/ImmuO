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

## Samples

TBD

## Versions

- 0.0.1 Published

## To do

Native array support.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/ImmuO) and submit
[pull requests](https://github.com/ajlopez/ImmuO/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

