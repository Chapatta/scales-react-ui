// Define a basic class representing a person
export default class Fret {
    // Properties (instance variables)
    // private position: number;
    // private finger: number;
    // private note: string;

    public position: number;
    public finger: number;
    public note: string;
  
    // Constructor to initialize the class with values
    constructor(position: number, finger: number, note: string) {
      this.position = position;
      this.finger = finger;
      this.note = note;
    }
  
    // Getter to retrieve the person's name
    /*
    getName(): string {
      return this.name;
    }
  
    // Setter to change the person's age
    setAge(age: number): void {
      if (age > 0) {
        this.age = age;
      } else {
        console.error("Age must be positive.");
      }
    }
  */

    // Method to return a string representation of the person
    toString(): string {
      return `Person[position=${this.position}, finger=${this.finger}, note=${this.note}]`;
    }
  }
  
