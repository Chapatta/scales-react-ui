// Define a basic class representing a person
class Person {
    // Properties (instance variables)
    private name: string;
    private age: number;
  
    // Constructor to initialize the class with values
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    // Getter to retrieve the person's name
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
  
    // Method to return a string representation of the person
    toString(): string {
      return `Person[name=${this.name}, age=${this.age}]`;
    }
  }
  
  // Create an instance of the Person class
  const person1 = new Person("Alice", 30);
  
  // Use the getter to get the name
  console.log(person1.getName()); // Output: Alice
  
  // Use the setter to update the age
  person1.setAge(31);
  
  // Display the person's details
  console.log(person1.toString()); // Output: Person[name=Alice, age=31]