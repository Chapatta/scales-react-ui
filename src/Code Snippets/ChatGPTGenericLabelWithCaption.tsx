import React from 'react';

// Define a TypeScript interface for the props
interface LabelProps<T> {
  value: T; // The value to be displayed
  caption: string; // The caption to be displayed alongside the value
}

// Create the functional component
function GenericLabel<T>({ value, caption }: LabelProps<T>) {
  return (
    <div>
      <span>{caption}: </span>
      <span>{value}</span>
    </div>
  );
}

export default GenericLabel;

//Usage
// import React from 'react';
// import GenericLabel from './GenericLabel';

// function App() {
//   return (
//     <div>
//       {/* Usage with string value */}
//       <GenericLabel value="Hello World" caption="Greeting" />
      
//       {/* Usage with number value */}
//       <GenericLabel value={42} caption="Number" />
      
//       {/* Usage with boolean value */}
//       <GenericLabel value={true} caption="Boolean" />
      
//       {/* Usage with custom object value */}
//       <GenericLabel value={{ name: 'John', age: 30 }} caption="Person" />
//     </div>
//   );
// }

// export default App;

// import GenericLabel from './GenericLabel';

// function App() {
//   // Define state variables
//   const [stringValue, setStringValue] = useState<string>("Hello World");
//   const [numberValue, setNumberValue] = useState<number>(42);
//   const [booleanValue, setBooleanValue] = useState<boolean>(true);
//   const [objectValue, setObjectValue] = useState<{ name: string; age: number }>({ name: 'John', age: 30 });

//   return (
//     <div>
//       {/* Usage with string value */}
//       <GenericLabel value={stringValue} caption="String Value" />
//       <button onClick={() => setStringValue("New String")}>Change String Value</button>
      
//       {/* Usage with number value */}
//       <GenericLabel value={numberValue} caption="Number Value" />
//       <button onClick={() => setNumberValue(99)}>Change Number Value</button>
      
//       {/* Usage with boolean value */}
//       <GenericLabel value={booleanValue} caption="Boolean Value" />
//       <button onClick={() => setBooleanValue(false)}>Change Boolean Value</button>
      
//       {/* Usage with custom object value */}
//       <GenericLabel value={objectValue} caption="Object Value" />
//       <button onClick={() => setObjectValue({ name: 'Alice', age: 25 })}>Change Object Value</button>
//     </div>
//   );
// }

// export default App;
