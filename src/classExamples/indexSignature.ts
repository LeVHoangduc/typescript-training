interface Goods {
  milk: number;
  coca: number;
}

const todayCart: Goods = {
  milk: 10,
  coca: 5,
};

console.log(todayCart["milk"]);

let prop: string = "milk";

// ERROR
// Case 1: No index signature with a parameter of type
console.log(todayCart[prop]);

// Case 2: used in a loop
const sumCart = (todayCart: Goods): number => {
  let total = 0;
  for (const item in todayCart) {
    // ERROR: No index signature with a parameter of type
    total += todayCart[item];
  }
  return total;
};

// Use index signature

interface GoodsSecond {
  [index: string]: number;
}

const carts: GoodsSecond = {
  milk: 10,
  coca: 5,
};

let prop2: string = "milk";

console.log(carts[prop2]);

const sumCarts = (carts: GoodsSecond): number => {
  let total = 0;
  for (const item in carts) {
    total += carts[item];
  }
  return total;
};
