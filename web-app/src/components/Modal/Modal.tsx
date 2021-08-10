import './styles.css';

type Props = {
  handleClose: () => void;
  isVisible: boolean;
  children: JSX.Element;
};
const Modal = ({ handleClose, isVisible, children }: Props) => {
  if (!isVisible) return null;
  return (
    <div className='modal display-block'>
      <section className='modal-main'>
        {children}
        <div className='close' onClick={handleClose} />
      </section>
    </div>
  );
};

export default Modal;
