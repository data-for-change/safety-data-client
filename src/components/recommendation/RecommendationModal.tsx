import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import RecommendationForm from './RecommendationForm';
import { useStore } from '../../stores/storeConfig';
import { Recommendation } from '../../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/types';

const RecommendationModal: React.FC = observer(() => {
  const { t } = useTranslation();
  const { recommendationStore } = useStore();
  const {submitRecommendation, deleteRecommendation} = recommendationStore;
  const { isOpenModal, closeModal, selectedRecommendation } = recommendationStore;
  const language  = useSelector((state: RootState) => state.appUi.language);

  if (!isOpenModal) return null;
  const mode = (selectedRecommendation) ? "edit" : "create";
  const handleSave = (updatedData: Recommendation) => {
    submitRecommendation(updatedData);
    closeModal();
  };
  const handleDelete = (id: string ) => {
    deleteRecommendation(id);
    closeModal();
  };

  return (
    <Modal show={isOpenModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'edit' ? t('Edit Recommendation') : t('Create Recommendation')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecommendationForm
          initialData={mode === 'edit' ? selectedRecommendation : undefined}
          onSave={handleSave}
          onDelete= {handleDelete}
          language={language}
        />
      </Modal.Body>
    </Modal>
  );
});

export default RecommendationModal;
