import axios from 'axios';

const TRANSACTIONS_API_URL = `${import.meta.env.VITE_BASE_URL}/transactions`;

export const fetchTransactions = (month: string, page: number, perPage: number, search: string) => {
  return axios.get(`${TRANSACTIONS_API_URL}/list`, {
    params: { month, page, perPage, search },
  });
};

export const fetchStatistics = (month: string) => {
  return axios.get(`${TRANSACTIONS_API_URL}/statistics`, { params: { month } });
};

export const fetchBarChartData = (month: string) => {
  return axios.get(`${TRANSACTIONS_API_URL}/bar-chart`, { params: { month } });
};

export const fetchPieChartData = (month: string) => {
  return axios.get(`${TRANSACTIONS_API_URL}/pie-chart`, { params: { month } });
};
