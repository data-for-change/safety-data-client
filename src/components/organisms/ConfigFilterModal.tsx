import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConfigFilter from '../molecules/ConfigFilter';

interface IProps {
  showModal: boolean;
  setShow: (show: boolean) => void;
}

const ConfigFilterModal: React.FC<IProps> = ({ showModal, setShow }) => {
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Filter Options')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ConfigFilter />
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
