class Point {
  x: number;
  y: string;

  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    if (typeof xs === "number" && typeof y === "string") {
      // Constructor overload: Point(x: number, y: string)
      this.x = xs;
      this.y = y;
    } else if (typeof xs === "string" && y === undefined) {
      // Constructor overload: Point(s: string)
      const parts = xs.split(",");
      if (parts.length === 2) {
        this.x = parseFloat(parts[0]);
        this.y = parts[1];
      } else {
        throw new Error("Invalid format for string constructor");
      }
    } else {
      throw new Error("Invalid constructor parameters");
    }
  }
}

// Usage
const point1 = new Point(10, "20");
console.log(point1); // Output: Point { x: 10, y: '20' }

const point2 = new Point("5.5,6.6");
console.log(point2); // Output: Point { x: 5.5, y: '6.6' }

const point3 = new Point(3, "4"); // This will throw an error because of invalid parameters
