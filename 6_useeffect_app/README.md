# Understanding useEffect Types in React

## Overview
The `useEffect` Hook in React is a crucial tool for handling side effects in functional components. There are three main types of useEffect implementations, each serving different purposes.

## Types of useEffect

### 1. useEffect with No Dependency Array
```jsx
useEffect(() => {
  console.log('This runs after every render');
});
```
- Runs after every render
- Used when you need to perform an effect that depends on every update
- **Example Use Case**: Logging component updates or tracking real-time changes

### 2. useEffect with Empty Dependency Array
```jsx
useEffect(() => {
  console.log('This runs only once after initial render');
}, []);
```
- Runs only once after the initial render
- Similar to `componentDidMount` in class components
- **Example Use Case**: Initial data fetching, subscriptions, or one-time setup

### 3. useEffect with Dependencies
```jsx
useEffect(() => {
  console.log(`This runs when count changes: ${count}`);
}, [count]);
```
- Runs when specified dependencies change
- Optimizes performance by preventing unnecessary effect executions
- **Example Use Case**: Updating derived state or responding to prop/state changes

## Practical Examples

### 1. Continuous Update Example
```jsx
function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return <div>Current time: {time.toLocaleTimeString()}</div>;
}
```

### 2. One-time Setup Example
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### 3. Dependent Update Example
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query).then(data => setResults(data));
    }
  }, [query]);

  return <div>{results.map(result => <div key={result.id}>{result.title}</div>)}</div>;
}
```

## Best Practices
1. Always clean up side effects when necessary (using the return function)
2. Keep dependencies array accurate to prevent bugs
3. Avoid infinite loops by carefully managing dependencies
4. Use appropriate dependency array type based on your use case

## Common Pitfalls to Avoid
- Missing dependency array (causing infinite renders)
- Incorrect dependencies in the dependency array
- Not cleaning up side effects (memory leaks)
- Using useEffect when not necessary