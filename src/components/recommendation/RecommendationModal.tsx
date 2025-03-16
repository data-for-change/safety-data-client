import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import RecommendationForm from './RecommendationForm';
import { useStore } from '../../stores/storeConfig';
import { Recommendation } from '../../types';

const RecommendationModal: React.FC = observer(() => {
  const { t } = useTranslation();
  const { recommendationStore } = useStore();
  const { isOpenModal, closeModal, selectedRecommendation } = recommendationStore;

  if (!isOpenModal) return null;
  const mode = (selectedRecommendation) ? "edit": "create"; 
  const handleSave = (updatedData: Recommendation) => {
    recommendationStore.submitRecommendation(updatedData);
    closeModal();
  };

  return (
    <Modal show={isOpenModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'edit' ? t('Edit Recommendation') : t('Create Recommendation')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecommendationForm initialData={mode === 'edit' ? selectedRecommendation : undefined} onSave={handleSave} />
      </Modal.Body>
    </Modal>
  );
});

export default RecommendationModal;
