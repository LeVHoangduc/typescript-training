interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

class Ball implements Pingable {
  pong() {
    console.log("pong!");
  }
}

interface Checkable {
  check(name: number): boolean;
}

class NameChecker implements Checkable {
  check(s) {
    // Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowerCase() === "ok";
  }
}
