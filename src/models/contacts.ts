export interface Contact {
  id: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
  thumbnail?: string;
}

export type ContactsResponse = Contact[];
