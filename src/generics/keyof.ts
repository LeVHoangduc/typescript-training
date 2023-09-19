interface Student {
  id: number;
  name: string;
}

type StudentKeys = keyof Student;

const keys: StudentKeys = "id";
