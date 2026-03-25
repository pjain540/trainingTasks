async function fetchUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        //process data
        const processedData = data.map(user => ({
            name: user.name,
            email: user.email,
            city: user.address.city
        }))
        return processedData
    } catch (err) {
        console.error("Error fetching users:", err.message)
        return null
    }
}

(async () => {
    const users = await fetchUsers()
    if (users) {
        console.log('Processed Users Data:');
        console.log(users);
    } else {
        console.log('Failed to fetch users.');
    }
})()