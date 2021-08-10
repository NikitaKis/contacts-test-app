import * as React from 'react';

import useContacts from '../../hooks/useContacts';

const Contacts = (): JSX.Element => {
  const { data } = useContacts();
  console.log('🚀 ~ file: App.tsx ~ line 8 ~ App ~ data', data);
  return (
    <div>
      <h1>Contacts</h1>
    </div>
  );
};

export default Contacts;
