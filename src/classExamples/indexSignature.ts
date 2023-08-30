// ---- Index Signatures ----
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

const instance = new MyClass();
instance["property1"] = true;
instance["property2"] = (s: string) => s.length > 5;

console.log(instance.check("property1")); // Result: true
console.log(instance.check("property2")); // Result: true or false depending on the length of the input string
console.log(instance.check("property3")); // Result: undefined, because this property is not defined
