class TypeThis {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedTypeThis extends TypeThis {
  otherContent: string = "?";
}

const base = new TypeThis();
const derived = new DerivedTypeThis();
const derived2 = new DerivedTypeThis();
derived.sameAs(base);
