// T is type
// K, V is key & value
interface List<T> {
  length: number;
  [index: number]: T;
}

// const numberList: List<number> = {
//   length: 2,
//   [0]: 2,
// };

interface Student {
  id: number;
  name: string;
}

const studentList: List<Student> = [{ id: 1, name: "alexandre" }];

interface ListTwo<T> {
  length: number;
  [index: string]: T | number;
}

// Example type generic for call api
interface ListResponse<T> {
  message: string;
  data: T;
}
interface City {
  name: string;
}
const numberList: List<number> = [1, 2, 3];

const getCity: ListResponse<City> = {
  message: "success",
  data: {
    name: "da nang",
  },
};
