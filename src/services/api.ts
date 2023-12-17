import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://frontend-task-api.metasite.lt/api',
});

export enum endpoints {
  CONTACTS = '/contacts',
}
