import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import emptyThumbnail from './../../assets/images/empty.webp';
import Card from '../Card/Card';
import { api, endpoints } from '../../services/api';
import { Contact } from '../../models/contacts';
import Loader from '../Loader/Loader';
import Empty from '../Empty/Empty';

import styles from './UserCard.module.scss';
import { useTableStore } from '../../store/tableStore';

export interface SidebarProps {
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const { data, isLoading, isFetching } = useQuery(id, fetchSelectedContact, {
    refetchOnWindowFocus: false,
    retry: false,
  });
  const setSelectedRowId = useTableStore((state) => state.setSelectedRowId);

  const { thumbnail, name, surname, email, phone, city } =
    (data as Contact) || {};
  const loading = useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching]
  );
  const formattedName = useMemo(() => {
    if (name && surname) {
      return `${name} ${surname.slice(0, 1)}.`;
    }
  }, [name, surname]);

  async function fetchSelectedContact() {
    try {
      const response = await api.get<Contact>(`${endpoints.CONTACTS}/${id}`);
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

  const handleClose = () => {
    setSelectedRowId(null);
  };

  return (
    <Card>
      <div className={styles.image}>
        <IconButton
          sx={{ position: 'absolute', right: '0' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {!loading && !!data && (
          <img
            className={styles.thumbnail}
            src={thumbnail || emptyThumbnail}
            alt="thumbnail"
          />
        )}
      </div>

      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {!loading && !!data && (
        <div className={styles.content}>
          <h2 className={styles.title}>{formattedName}</h2>

          <div className={styles.info}>
            <div className={styles.row}>
              <div className={styles.label}>Name:</div>
              {formattedName}
            </div>

            <div className={styles.row}>
              <div className={styles.label}>City:</div>
              {city}
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Email:</div>
              <a href={`mailto: ${email}`} type="email">
                {email}
              </a>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Phone:</div>
              {phone}
            </div>
          </div>
        </div>
      )}

      {!loading && !data && <Empty />}
    </Card>
  );
};

export default Sidebar;
