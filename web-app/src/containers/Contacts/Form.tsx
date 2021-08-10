import React from 'react';
import { BaseContact, Contact } from '../../types/data';

interface Props {
  contact?: Contact | null;
  onSubmit: (contact: BaseContact) => void;
  buttonText?: string;
  errors: string[] | null;
}

const Form = (props: Props) => {
  const { onSubmit, contact, buttonText = 'Update', errors } = props;
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
    if (!name || !email || !phoneNumber || !streetName || !houseNumber || !city || !stateProvince) return null;
    onSubmit({
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
    <form onSubmit={handleSubmit}>
      <div className='row inputsContainer'>
        <div>
          <label htmlFor='name'>
            Name
            <input className='input' type='text' id='name' name='name' defaultValue={contact?.name} required />
          </label>

          <label htmlFor='email'>
            Email
            <input className='input' type='email' id='email' name='email' defaultValue={contact?.email} required />
          </label>

          <label htmlFor='phoneNumber'>
            Phone number
            <input className='input' type='phone' id='phoneNumber' name='phoneNumber' defaultValue={contact?.phoneNumber} required />
          </label>
        </div>
        <div>
          <label htmlFor='streetName'>
            Street Name
            <input className='input' type='text' id='streetName' name='streetName' defaultValue={contact?.address.streetName} required />
          </label>
          <label htmlFor='houseNumber'>
            House Number
            <input className='input' type='text' id='houseNumber' name='houseNumber' defaultValue={contact?.address.houseNumber} required />
          </label>
          <label htmlFor='city'>
            City
            <input className='input' type='text' id='city' name='city' defaultValue={contact?.address.city} required />
          </label>
          <label htmlFor='stateProvince'>
            State/Province
            <input className='input' type='text' id='stateProvince' name='stateProvince' defaultValue={contact?.address.stateProvince} required />
          </label>
        </div>
      </div>
      {errors ? (
        <>
          <h4>Errors:</h4>
          <ul>
            {errors.map((error) => (
              <li className='error'>{error}</li>
            ))}
          </ul>
        </>
      ) : null}
      <br />
      <button>{buttonText}</button>
    </form>
  );
};

export default Form;
