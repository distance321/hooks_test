import React, { useState, useEffect  } from 'react';
import request from '../../utils/request'
import '../../../mock/test.js'
import axios from 'axios'
export default function Example() {
  const [count, setCount] = useState(0);
  const [url,setUrl] = useState('/api/test')
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(url)
  },[url])

  const fetch =  async (url:string) => {
    const res = await axios.get('/data')
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

