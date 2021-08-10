import React from 'react';
import Modal from '../../components/Modal';
import { Contact } from '../../types/data';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  contact: Contact | null;
  onSubmit: (contact: Contact) => void;
}

export const EditContact = (props: Props) => {
  const { isVisible, onClose, onSubmit, contact } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const phoneNumber = formData.get('phoneNumber')?.toString();
    const streetName = formData.get('streetName')?.toString();
    const houseNumber = formData.get('houseNumber')?.toString();
    const city = formData.get('city')?.toString();
    const stateProvince = formData.get('stateProvince')?.toString();
    if (!contact || !name || !email || !phoneNumber || !streetName || !houseNumber || !city || !stateProvince) return null;
    onSubmit({
      id: contact?.id,
      name,
      email,
      phoneNumber,
      address: {
        streetName,
        houseNumber: +houseNumber,
        city,
        stateProvince,
      },
    });
  };

  return (
    <Modal isVisible={isVisible} handleClose={onClose}>
      <div className='modalContainer'>
        <h2>Edit contact</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div>
              <label htmlFor='name'>
                Name
                <input className='input' type='text' id='name' name='name' defaultValue={contact?.name} />
              </label>

              <label htmlFor='email'>
                Email
                <input className='input' type='email' id='email' name='email' defaultValue={contact?.email} />
              </label>

              <label htmlFor='phoneNumber'>
                Phone number
                <input className='input' type='phone' id='phoneNumber' name='phoneNumber' defaultValue={contact?.phoneNumber} />
              </label>
            </div>
            <div>
              <label htmlFor='streetName'>
                Street Name
                <input className='input' type='text' id='streetName' name='streetName' defaultValue={contact?.address.streetName} />
              </label>
              <label htmlFor='houseNumber'>
                House Number
                <input className='input' type='text' id='houseNumber' name='houseNumber' defaultValue={contact?.address.houseNumber} />
              </label>
              <label htmlFor='city'>
                City
                <input className='input' type='text' id='city' name='city' defaultValue={contact?.address.city} />
              </label>
              <label htmlFor='stateProvince'>
                State/Province
                <input className='input' type='text' id='stateProvince' name='stateProvince' defaultValue={contact?.address.stateProvince} />
              </label>
            </div>
          </div>
          <button>Update</button>
        </form>
      </div>
    </Modal>
  );
};
