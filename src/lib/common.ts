import axios from "axios";

export const deleteCookie = (name: string) => {
    setCookie(name, '', 0)
}

export const setCookie = (name: string, value: string, expHours: number) => {
    // set expiring time
    const date = new Date()
    const addedTime = (expHours === 0) ? -1 : (expHours*60*60*1000)
    date.setTime(date.getTime() + addedTime)
    const expires = "expires=" + date.toUTCString()

    // build string
    const cookieStr = `${name}=${value};${expires};domain=${location.hostname};samesite=strict;path=/`

    // set cookie
    document.cookie = cookieStr
}

export const getCookie = (name: string): string => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }

  return "";
}

export const fetchApi = (withCredential: boolean = false) => {
    const baseURL = 'http://94.74.86.174:8080/api'
    if (withCredential) {    
        const token = getCookie('access_token')
        return axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } else {
        return axios.create({
            baseURL: baseURL
        })
    }
}