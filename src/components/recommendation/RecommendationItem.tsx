import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListGroup } from 'react-bootstrap';
import { Recommendation } from '../../types';


interface Props {
  recommendation: Recommendation;
}

const RecommendationItem: React.FC<Props> = ({ recommendation }) => {
    const {t} = useTranslation();
   return (
    <ListGroup.Item>
      <h5>{recommendation.title}</h5>
      <p>{recommendation.description}</p>
      <small>{t('Category')}: {recommendation.category}</small>
    </ListGroup.Item>
  );
};

export default RecommendationItem;