const hostname = window.location.hostname;

const api = {
  'localhost': 'http://localhost:9090/api/',
};

// export const API_BASE_URL = api[hostname];
export const API_BASE_URL = 'https://robo-pm-dev.stratifi.com/api/';

// const AUTH_TOKEN = 'WyIyIiwiMjRlNjc5OWZjNDYzMjMyMTcyYjY5NDI5NTllOWEyZjQiXQ.CvjPkw.4SzjzCRDmWJ1iHSi_tzuNlJC0AE';
const AUTH_TOKEN = 'WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8';

export const HEADERS = {
  'Authorization': AUTH_TOKEN,
  'Content-Type': 'application/json'
};
