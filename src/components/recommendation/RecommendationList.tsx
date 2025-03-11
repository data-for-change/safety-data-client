import React,{ useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/storeConfig';
import RecommendationItem from './RecommendationItem';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';

const RecommendationList: React.FC = observer(() => {
  const { recommendationStore } = useStore();



  if (recommendationStore.loading) {
    return <Spinner animation="border" />;
  }

  if (!recommendationStore.recommendationsList.length) {
    return <Alert variant="info">No recommendations available.</Alert>;
  }

  return (
    <ListGroup>
      {recommendationStore.recommendationsList.map((rec) => (
        <RecommendationItem key={rec._id} recommendation={rec} />
      ))}
    </ListGroup>
  );
});

export default RecommendationList;
