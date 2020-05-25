import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
  title: string;
  showModal: boolean;
  setShow: (show: boolean) => void;
}

const ConfigFilterModal: React.FC<IProps> = ({ title, showModal, setShow, children }) => {
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfigFilterModal;
