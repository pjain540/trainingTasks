//Challenge 2: Fetch API Data (Node.js)

async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    const result = data.map(user => ({
      name: user.name,
      email: user.email
    }));

    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

getUsers();