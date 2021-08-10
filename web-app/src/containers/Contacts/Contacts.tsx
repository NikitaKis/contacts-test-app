import { useState, useMemo } from 'react';
import Table from './Table';

import useContacts from '../../hooks/useContacts';
import { Address, Contact, ContactId } from '../../types/data';
import './styles.css';
import { EditContact } from './EditContact';

const addressToString = (address: Address) => {
  const { houseNumber, streetName, city, stateProvince } = address;
  return `${houseNumber}, ${streetName}, ${city}, ${stateProvince}`;
};
const Contacts = (): JSX.Element | null => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const { data, refetch, removeContact, updateContact } = useContacts(page, pageSize);

  //@ts-ignore
  const onDelete = (contactId: ContactId) => {
    removeContact(contactId);
    refetch();
  };
  const onEdit = (contact: Contact) => {
    setCurrentContact(contact);
  };
  const onCloseModal = () => {
    setCurrentContact(null);
  };
  const onUpdateContact = (contact: Contact) => {
    onCloseModal();
    updateContact(contact);
  };
  const columns = useMemo(
    () => [
      {
        Header: 'id',
        id: 'row',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Address',
        maxWidth: 200,
        //@ts-ignore
        Cell: (row) => <span>{`${addressToString(row.row.original.address)}`}</span>,
      },
      {
        Header: 'Action',
        id: 'delete',
        //@ts-ignore
        Cell: (row) => (
          <>
            <button className='button' onClick={() => onEdit(row.row.original)}>
              Edit
            </button>
            <button className='button' onClick={() => onDelete(row.row.original.id)}>
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!data) return [];
    return data.data.map((item) => item);
  }, [data]);

  const onNextPage = () => setPage((oldPage) => oldPage + 1);
  const onPrevPage = () => setPage((oldPage) => oldPage - 1);

  return (
    <div className='container'>
      <h1>Contacts</h1>
      <Table
        data={tableData}
        columns={columns}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        hasMore={data?.hasMore || false}
        page={page}
        totalItems={data?.totalItems}
        totalPages={data?.totalPages}
      />
      <EditContact isVisible={!!currentContact} onClose={onCloseModal} contact={currentContact} onSubmit={onUpdateContact} />
    </div>
  );
};

export default Contacts;
