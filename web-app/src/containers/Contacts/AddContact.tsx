import Modal from '../../components/Modal';
import { BaseContact } from '../../types/data';
import Form from './Form';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (contact: BaseContact) => void;
  errors: string[] | null;
}

export const AddContact = (props: Props) => {
  const { isVisible, onClose, onSubmit, errors } = props;
  return (
    <Modal isVisible={isVisible} handleClose={onClose}>
      <div className='modalContainer'>
        <h2>Add contact</h2>
        <Form onSubmit={onSubmit} buttonText='Create' errors={errors} />
      </div>
    </Modal>
  );
};
