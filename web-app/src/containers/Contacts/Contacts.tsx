import React, { useState, useMemo } from 'react';
import Table from './Table';

import useContacts from '../../hooks/useContacts';
import { ContactId } from '../../types/data';

const Contacts = (): JSX.Element | null => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, refetch, removeContact } = useContacts(page, pageSize);

  //@ts-ignore
  const onDelete = (contactId: ContactId) => {
    removeContact(contactId);
    refetch();
  };
  const columns = useMemo(
    () => [
      {
        Header: 'id',
        id: 'row',
        maxWidth: 100,
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Action',
        id: 'delete',
        //@ts-ignore
        Cell: (row) => <span onClick={() => onDelete(row.row.original.id)}>Delete</span>,
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
    <div>
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
    </div>
  );
};

export default Contacts;
