import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';

interface IProps {
  title: string;
  showModal: boolean;
  setShow: (show: boolean) => void;
  children: any;
  size?: "sm" | "lg" | "xl" | undefined;
  action?: (val?: any) => void;
}


const ConfigModal: React.FC<IProps> = observer(({
  title, showModal, setShow, children, size, action
}: IProps) => {

  console.log('MODAL')
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  const { filterStore } = useStore();

  const submitChanges = action ?
    <Button
      variant="primary"
      onClick={action}
      disabled={filterStore.isLoading || !filterStore.isValidAllFilters}
    >
      {filterStore.isLoading ? t('Loading') : t('Submit')}
    </Button>
    : null

  return (
    <Modal
      size={size}
      show={showModal}
      onHide={handleClose}
    // style={{ top: '45px' }}
    >

      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {submitChanges}
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default React.memo(ConfigModal);
