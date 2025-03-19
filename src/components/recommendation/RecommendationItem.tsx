import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { Recommendation } from '../../types';
import './RecommendationItem.css';

interface Props {
  recommendation: Recommendation;
  onEdit: (updatedRecommendation: Recommendation) => void;
  hasEditPermission: boolean;
}

const RecommendationItem: React.FC<Props> = ({ recommendation, onEdit, hasEditPermission }) => {
  const { t } = useTranslation();
  const handleEditClick = () => {
    onEdit(recommendation);
  };
  return (
    <>
      <ListGroup.Item className="recommendation-item">
        <div className="recommendation-header">
          <h5 className="recommendation-title">{recommendation.title}</h5>
          {hasEditPermission && (
            <Button variant="primary" size="sm" onClick={handleEditClick} className="edit-button">
              {t('Edit')}
            </Button>
          )}
        </div>
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
      </ListGroup.Item>
    </>
  );
};

export default RecommendationItem;
