class Person {
  _prop: any;

  get prop() {
    return this._prop;
  }
  set prop(value) {
    this._prop = value;
  }
}

const personA = new Person();
console.log(personA.prop); // Call getter
personA.prop = 42; // Call setter
