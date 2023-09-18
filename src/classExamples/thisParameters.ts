class ThisParameter {
  name = "MyClass";
  getName(this: ThisParameter) {
    return this.name;
  }
}
const x = new ThisParameter();
// OK
x.getName();

// Error, would crash
const g = x.getName;
console.log(g());
