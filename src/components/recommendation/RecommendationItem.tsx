import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup, Badge } from 'react-bootstrap';
import { Recommendation } from '../../types';


interface Props {
  recommendation: Recommendation;
}

const RecommendationItem: React.FC<Props> = ({ recommendation }) => {
    const { t } = useTranslation();
  
    return (
      <ListGroup.Item className="recommendation-item">
        <h5 className="recommendation-title">{recommendation.title}</h5>
        <p className="recommendation-description">{recommendation.description}</p>
        <div className="recommendation-tags">
          {recommendation.tags.map((tag, index) => (
            <Badge key={index} className="recommendation-badge">{tag}</Badge>
          ))}
        </div>
        {recommendation.references.length > 0 && (
          <div className="recommendation-references">
            <strong>{t('References')}:</strong>
            <ul>
              {recommendation.references.map((ref, index) => (
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
    );
  };
  
  export default RecommendationItem;