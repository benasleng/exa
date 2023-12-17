import { create } from 'zustand';
import { ContactsResponse } from '../models/contacts';

type State = {
  contacts: ContactsResponse;
};

type Actions = {
  setContacts: (data: ContactsResponse) => void;
  resetStore: () => void;
};

type DataStore = State & Actions;

const initialState: State = {
  contacts: [],
};

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  setContacts: (data) => {
    set({ contacts: data });
  },
  resetStore: () => {
    set(initialState);
  },
}));
