export type Class = new (...args: any[]) => any;

// generic functions
// meaning they take a type parameter Base (the base class) and return a new class.
// Base is name of generic parameter
export function DisposableMixin<Base extends Class>(base: Base) {
  return class extends base {
    isDisposed: boolean = false;
    dispose() {
      this.isDisposed = true;
    }
  };
}

export function ActivatableMixin<Base extends Class>(base: Base) {
  return class extends base {
    isActive: boolean = false;
    activate() {
      this.isActive = true;
    }
    deactivate() {
      this.isActive = false;
    }
  };
}

const Example = DisposableMixin(ActivatableMixin(class {}));

const example = new Example();

// Example 2

class ExampleTwo extends DisposableMixin(ActivatableMixin(class {})) {
  member = 123;
  constructor() {
    super();
  }
}

const exampleTwo: ExampleTwo = new ExampleTwo();
