class HTTPClient {
    baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    // Function to make a GET request
    async get(endpoint: string): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be caught by the caller
      }
    }
  }
  
  // Example usage
  const baseUrl = 'https://jsonplaceholder.typicode.com'; // Example API base URL
  const client = new HTTPClient(baseUrl);
  
  // Make a GET request to fetch a list of users
  client.get('users')
    .then(users => {
      console.log('Users:', users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  