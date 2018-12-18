import { Route, HashRouter } from 'react-router-dom';
import { hashHistory } from 'react';
//request方法封装了添加access-token头等逻辑 由于我们每个接口的请求都需要加上一个名为access-token的header，在每次需要调用接口的时候都写一遍就非常的不明智了，所以我们需要封装fetch方法。

export default function request (method, url, body) {
  method = method.toUpperCase();
  if (method === 'GET') {
    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
    },
    body
  })
    .then((res) => {
      if (res.status === 401) {
        window.location.hash = '/login'
        return Promise.reject('Unauthorized.');
      } else {
        const token = res.headers.get('access-token');
        if (token) {
          sessionStorage.setItem('access_token', token);
        }
        return res.json();
      }
    }).catch(e => {
        console.error(e.toString())
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);