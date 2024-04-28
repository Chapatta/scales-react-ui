interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // Define a dictionary using an object
  const users: { [key: number]: User } = {
    1: { id: 1, name: "Alice", email: "alice@example.com" },
    2: { id: 2, name: "Bob", email: "bob@example.com" },
  };
  
  // Access a user by key
  const user1 = users[1];
  console.log(user1.name); // Output: Alice
  
  // Add a new user
  users[3] = { id: 3, name: "Charlie", email: "charlie@example.com" };
  
  // Iterate over the dictionary
  for (const key in users) {
    console.log(`${key}: ${users[key].name}`);
  }
  