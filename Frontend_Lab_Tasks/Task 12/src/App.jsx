
function HelloWorld() {
  return <h1>Hello World!</h1>;
}

function App() {
  const name = "Abhishek Parashar";
  const age = 19;
  const Section ="2FA";

  return (
    <div>
      <HelloWorld />

      <h2>Welcome to my React Learning journey</h2>

      <p>My name is {name}</p>
      <p>My age is {age}</p>
      <p>My section is {Section}</p>

      <p>Multiply of 10 and 20 is: {10 * 20}</p>
    </div>
  );
}

export default App;
