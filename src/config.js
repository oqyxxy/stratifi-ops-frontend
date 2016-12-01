const hostname = window.location.hostname;

const api = {
  'localhost': 'http://localhost:9090/api/',
  'robo-pm-frontend.netlify.com': 'https://robo-pm-dev.stratifi.com/api/'
};

const authTokens = {
  'localhost': 'WyIyIiwiMjRlNjc5OWZjNDYzMjMyMTcyYjY5NDI5NTllOWEyZjQiXQ.CvjPkw.4SzjzCRDmWJ1iHSi_tzuNlJC0AE',
  'robo-pm-frontend.netlify.com': 'WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8'
};


export const API_BASE_URL = api[hostname];
const AUTH_TOKEN = authTokens[hostname];


export const HEADERS = {
  'Authorization': AUTH_TOKEN,
  'Content-Type': 'application/json'
};


export const INTL_CONFIG = {
  locale: 'en',
  formats: {
    date: {
      date: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      dateMonthYear: {
        month: 'short',
        year: 'numeric',
      },
      dateYear: {
        year: 'numeric',
      },
    },
    number: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      },
      percentTenth: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
      percentHundredth: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    }
  }
};
