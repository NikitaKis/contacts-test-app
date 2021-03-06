import Modal from '../../components/Modal';
import { BaseContact, Contact } from '../../types/data';
import Form from './Form';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  contact: Contact | null;
  onSubmit: (contact: BaseContact) => void;
  errors: string[] | null;
}

export const EditContact = (props: Props) => {
  const { isVisible, onClose, onSubmit, contact, errors } = props;
  return (
    <Modal isVisible={isVisible} handleClose={onClose}>
      <div className='modalContainer'>
        <h2>Edit contact</h2>
        <Form onSubmit={onSubmit} contact={contact} errors={errors} />
      </div>
    </Modal>
  );
};
