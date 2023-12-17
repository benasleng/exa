import { renderHook } from '@testing-library/react';
import useContactsTable from '../hooks/useContactsTableRows';
import { SortBy } from '../store/tableStore';
import { Contact } from '../models/contacts';

const mockContacts = [
  {
    id: '2',
    name: 'Jane',
    surname: 'Doe',
    city: 'Los Angeles',
    email: 'jane@example.com',
    phone: '0987654321',
    isActive: false,
  },
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    city: 'New York',
    email: 'john@example.com',
    phone: '1234567890',
    isActive: true,
  },
];

const formattedMockContacts = mockContacts.map(
  ({ name, surname, ...rest }) => ({
    name: `${name} ${surname.slice(0, 1).toUpperCase()}.`,
    ...rest,
  })
);

const sortBy: SortBy = {
  column: 'name',
  order: 'asc',
};

interface ContactsHookConfig {
  contacts: Contact[];
  filters: Record<string, any>;
  sortBy: SortBy;
}
const renderContactsHook = ({
  contacts,
  filters,
  sortBy,
}: ContactsHookConfig) =>
  renderHook(() => useContactsTable(contacts, filters, sortBy));

describe('useContactsTable', () => {
  test('should return rows', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: {},
      sortBy: sortBy,
    });

    expect(result.current.rows).toHaveLength(2);
    expect(result.current.rows).toEqual(formattedMockContacts);
  });

  test('should filter rows based on name filter', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: { name: 'john' },
      sortBy: sortBy,
    });

    expect(result.current.rows).toEqual([formattedMockContacts[1]]);
  });

  test('should filter rows based on city filter', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: { city: 'los angeles' },
      sortBy: sortBy,
    });

    expect(result.current.rows).toEqual([formattedMockContacts[0]]);
  });

  test('should filter rows based on all filters', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: { city: 'los angeles', name: 'jane', showActive: false },
      sortBy: sortBy,
    });

    expect(result.current.rows).toEqual([formattedMockContacts[0]]);
  });

  test('should not find any rows based on filters', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: { city: 'los angeles', name: 'john', showActive: true },
      sortBy: sortBy,
    });

    expect(result.current.rows).toHaveLength(0);
  });

  test('should sort rows based on sortBy asc', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: {},
      sortBy: { column: 'name', order: 'asc' },
    });

    expect(result.current.rows).toEqual(formattedMockContacts);
  });

  test('should sort rows based on sortBy desc', () => {
    const { result } = renderContactsHook({
      contacts: mockContacts,
      filters: {},
      sortBy: { column: 'name', order: 'desc' },
    });

    expect(result.current.rows).toEqual([...formattedMockContacts].reverse());
  });
});
