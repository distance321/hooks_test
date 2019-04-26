import fetch from 'isomorphic-fetch'
import { notification } from 'antd';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  throw error;
};

export default function request(url: RequestInfo, option ?: any) {
  const defaultOptions = {
    credentials: 'include',
    'Content-Type': 'application/json'
  };
  const newOptions = { ...defaultOptions, ...option };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
        // Authorization : localStorage.getItem('token')
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
        // Authorization : localStorage.getItem('token')
      };
    }
  }
  //利用Promise.race对fetch添加超时处理
  return Promise.race([
    fetch(url, newOptions),
    new Promise(function (resolve, reject) {
      setTimeout(() => {
        const error = new Error('请求超时')
        error.name = 'timeout'
        reject(error)
      }, 10000);
    })])
    .then(checkStatus)
    .then((response: any) => {
      if (response.status === 204) {
        return response.status;
      }
      return response.json();
    })
    .catch((e: any) => {
      //根据状态码跳转到不同页面
      const status = e.name;
      if (status === 'timeout') {
        notification.error({
          message: `请求超时`,
          description: '请稍后重试',
        });
      }
      if (status === 401) {
        window.location.href = '/login'
        return;
      }
      if (status === 403) {
        window.location.href = '/exception/403'
        return;
      }
      if (status <= 504 && status >= 500) {
        window.location.href = '/exception/500'
        return;
      }
      if (status >= 404 && status < 422) {
        window.location.href = '/exception/404'
      }
    });
}