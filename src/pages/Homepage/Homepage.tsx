import React from 'react';
import { useQuery } from 'react-query';

import ContactsTable from '../../components/ContactsTable/ContactsTable';
import UserCard from '../../components/UserCard/UserCard';
import { useDataStore } from '../../store/dataStore';
import { useTableStore } from '../../store/tableStore';
import { api, endpoints } from '../../services/api';
import { ContactsResponse } from '../../models/contacts';

import styles from './Homepage.module.scss';

const Homepage: React.FC = () => {
  const selectedRowId = useTableStore((store) => store.selectedRowId);
  const setContacts = useDataStore((store) => store.setContacts);

  const { isLoading, isFetching } = useQuery(
    endpoints.CONTACTS,
    fetchContacts,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (data) => setContacts(data),
    }
  );

  async function fetchContacts() {
    try {
      const response = await api.get<ContactsResponse>(endpoints.CONTACTS);
      const { data = [], status } = response;

      if (status !== 200) {
        throw new Error('Error fetching contacts');
      }

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <ContactsTable loading={isLoading || isFetching} />
        </div>

        {selectedRowId && (
          <div className={styles.sidebar}>
            <UserCard id={selectedRowId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
