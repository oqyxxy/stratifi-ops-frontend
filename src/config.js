const hostname = window.location.hostname;

const api = {
  'localhost': 'http://localhost:9090/api/',
};

export const API_BASE_URL = api[hostname];
