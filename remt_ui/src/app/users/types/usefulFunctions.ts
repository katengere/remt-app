export function UUID() {
  const randomCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let index = 0; index < 12; index++) {
    const randomNo= Math.floor(Math.random()*randomCharacters.length);
    id += randomCharacters[randomNo];    
  }
  return id;
}

export function formatUrl(url: string): string{
  const urlArr = url.split('/');
    if(urlArr.length>=3){
        urlArr.pop();
    return urlArr.join('/');
  }
    return url;
} 