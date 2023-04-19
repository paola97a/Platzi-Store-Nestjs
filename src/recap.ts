const myName = 'Angie Paola';
const myAge = 25;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 23);
class Persona {
  //public is defaul to attributes
  //name;
  constructor(private age: number, private name: string) {}
  getSummary() {
    return 'my name is ${this.name}, ${this.age}';
  }
}
const angie = new Persona(25, 'Angie ');
angie.getSummary();
