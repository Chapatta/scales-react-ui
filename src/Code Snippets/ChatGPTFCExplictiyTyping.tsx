import React from 'react';

// Define an interface for the props
interface UserProps {
  name: string; // Name of the user
  age: number; // Age of the user
}

// Define the functional component with explicit typing for the props
const UserCard = ({ name, age }: UserProps) => (
  <div>
    <h2>User Information</h2>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
  </div>
);

export default UserCard;

// get rid of the awfule react.fc using explict typing
// import React from 'react';
// import UserCard from './UserCard'; // Import the UserCard component

// const App = () => {
//   const user = {
//     name: 'Alice',
//     age: 30,
//   };

//   return (
//     <div>
//       <h1>Welcome to the User Info App</h1>
//       <UserCard name={user.name} age={user.age} /> {/* Passing props to UserCard */}
//       </div>
//     );
//   };
  
//   export default App;

  