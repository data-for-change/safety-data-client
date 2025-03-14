import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/storeConfig';
import RecommendationItem from './RecommendationItem';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { Recommendation } from '../../types';

const RecommendationList: React.FC = observer(() => {
  const { recommendationStore } = useStore();

  if (recommendationStore.loading) {
    return <Spinner animation="border" />;
  }

  if (!recommendationStore.recommendationsList.length) {
    return <Alert variant="info">No recommendations available.</Alert>;
  }
  const onUpdate = (updatedRecommendation: Recommendation) =>{};
  return (
    <ListGroup>
      {recommendationStore.recommendationsList.map((rec) => (
        <RecommendationItem key={rec._id} recommendation={rec} onUpdate={onUpdate}/>
      ))}
    </ListGroup>
  );
});

export default RecommendationList;
