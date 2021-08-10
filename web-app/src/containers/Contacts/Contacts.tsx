import { useState, useMemo, useCallback } from 'react';
import Table from './Table';

import useContacts from '../../hooks/useContacts';
import { Address, BaseContact, Contact, ContactId } from '../../types/data';
import './styles.css';
import { EditContact } from './EditContact';
import { AddContact } from './AddContact';

const addressToString = (address: Address) => {
  const { houseNumber, streetName, city, stateProvince } = address;
  return `${houseNumber}, ${streetName}, ${city}, ${stateProvince}`;
};
const Contacts = (): JSX.Element | null => {
  const [page, setPage] = useState(0);
  //const [pageSize, setPageSize] = useState(10); //TODO: add changing page size
  const pageSize = 10;
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);
  const { data, refetch, createContact, removeContact, updateContact } = useContacts(page, pageSize);
  const [errors, setErrors] = useState<string[] | null>(null);

  const onDelete = useCallback(
    (contactId: ContactId) => {
      removeContact(contactId);
      refetch();
    },
    [removeContact, refetch]
  );
  const onEdit = useCallback(
    (contact: Contact) => {
      setCurrentContact(contact);
    },
    [setCurrentContact]
  );
  const onCreateContact = async (contact: BaseContact) => {
    try {
      setErrors(null);
      await createContact(contact);
      setIsNewFormVisible(false);
      refetch();
    } catch (error) {
      setErrors(error.errors);
    }
  };
  const onCloseModal = () => {
    setCurrentContact(null);
  };

  const onToggleNewFormModal = () => {
    setErrors(null);
    setIsNewFormVisible((oldValue) => !oldValue);
  };

  const onUpdateContact = (contact: BaseContact) => {
    if (!currentContact) return null;
    updateContact(currentContact?.id, contact);
    onCloseModal();
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
    [onEdit, onDelete]
  );

  const tableData = useMemo(() => {
    if (!data) return [];
    return data.data.map((item) => item);
  }, [data]);

  const onNextPage = () => setPage((oldPage) => oldPage + 1);
  const onPrevPage = () => setPage((oldPage) => oldPage - 1);

  return (
    <div className='container'>
      <div className='row header'>
        <h1>Contacts ({data?.totalItems || 0})</h1>
        <button className='addButton' onClick={onToggleNewFormModal}>
          Add
        </button>
      </div>

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
      <EditContact isVisible={!!currentContact} onClose={onCloseModal} contact={currentContact} onSubmit={onUpdateContact} errors={errors} />
      <AddContact isVisible={isNewFormVisible} onClose={onToggleNewFormModal} onSubmit={onCreateContact} errors={errors} />
    </div>
  );
};

export default Contacts;
