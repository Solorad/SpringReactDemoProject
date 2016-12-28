function request(url, method = 'GET', body) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open(method, url);
    req.onload = () => req.status === 200 ? resolve(JSON.parse(req.responseText)) : reject(Error(req.statusText));
    req.onerror = (e) => reject(Error(`Network Error: ${e}`));
    req.send(body);
  });
}

export default request;