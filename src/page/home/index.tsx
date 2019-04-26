import React, { useState, useEffect  } from 'react';
import request from '../../utils/request'
export default function Example() {
  const [count, setCount] = useState(0);
  const [url,setUrl] = useState('http://localhost:3000/api/v1/users')
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(url)
  },[url])

  const fetch =  async (url:string) => {
    const res = await request(url)
    setData(res.data)
  }
  return (
    <div>
      <p>hello Hooks</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

