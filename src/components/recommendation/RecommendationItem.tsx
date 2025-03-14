import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, Badge, Button, Modal } from 'react-bootstrap';
import { Recommendation } from '../../types';
import RecommendationForm from './RecommendationForm';

interface Props {
  recommendation: Recommendation;
  onUpdate: (updatedRecommendation: Recommendation) => void;
}

const RecommendationItem: React.FC<Props> = ({ recommendation, onUpdate }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = (updatedData: Recommendation) => {
    onUpdate(updatedData);
    setShowModal(false);
  };

  return (
    <>
      <ListGroup.Item className="recommendation-item">
        <h5 className="recommendation-title">{recommendation.title}</h5>
        <p className="recommendation-description">{recommendation.description}</p>
        <div className="recommendation-tags">
          {recommendation.tags.map((tag: string, index: number) => (
            <Badge key={index} className="recommendation-badge">{tag}</Badge>
          ))}
        </div>
        {recommendation.references.length > 0 && (
          <div className="recommendation-references">
            <strong>{t('References')}:</strong>
            <ul>
              {recommendation.references.map((ref: { title: string; url: string }, index: number) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <small className="recommendation-category">{t('Category')}: {recommendation.category}</small>
        <Button variant="primary" size="sm" onClick={handleEditClick} className="ms-2">
          {t('Edit')}
        </Button>
      </ListGroup.Item>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Edit Recommendation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RecommendationForm initialData={recommendation} onSave={handleSave} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecommendationItem;
