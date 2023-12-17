import { useState } from 'react';
import { useFiltersStore } from '../store/filtersStore';

export interface Filters {
  name?: string;
  city?: string | null;
  showActive?: boolean;
}

export const useFilters = () => {
  const setFilters = useFiltersStore((store) => store.setFilters);
  const [values, setValues] = useState<Filters>({
    showActive: true,
  });

  const handleChange = (name: string, value: any) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClear = (name: string) => {
    const newValues = Object.entries(values)
      .filter((filter) => filter[0] !== name)
      .reduce((acc, [key, filter]) => {
        return { ...acc, [key]: filter };
      }, {});

    setValues(newValues);
    setFilters(newValues);
  };

  const handleSubmit = () => {
    const cleanedValues = Object.entries(values).reduce(
      (acc, [key, filter]) => {
        if (filter || typeof filter === 'boolean') {
          return { ...acc, [key]: filter };
        }

        return acc;
      },
      {}
    );

    setFilters(cleanedValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleClear,
  };
};
