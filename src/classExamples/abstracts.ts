abstract class AbstractClass {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

class DerivedAbstract extends AbstractClass {
  getName() {
    return "world";
  }
}

// cannot be directly instantiated.
const b = new AbstractClass();

const d = new DerivedAbstract();
d.printName();
