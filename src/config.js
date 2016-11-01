const hostname = window.location.hostname;

const api = {
  'localhost': 'http://localhost:9090/api/',
};

export const API_BASE_URL = api[hostname];

const AUTH_TOKEN = 'WyIyIiwiMjRlNjc5OWZjNDYzMjMyMTcyYjY5NDI5NTllOWEyZjQiXQ.CvjPkw.4SzjzCRDmWJ1iHSi_tzuNlJC0AE';

export const HEADERS = {
  'Authorization': AUTH_TOKEN,
  'Content-Type': 'application/json'
};
