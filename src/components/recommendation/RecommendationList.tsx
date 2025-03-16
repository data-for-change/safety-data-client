import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/storeConfig';
import RecommendationItem from './RecommendationItem';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';

const RecommendationList: React.FC = observer(() => {
  const { recommendationStore } = useStore();
  const { loading, recommendationsList, openModal } = recommendationStore;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!recommendationsList.length) {
    return <Alert variant="info">No recommendations available.</Alert>;
  }
  return (
    <ListGroup>
      {recommendationsList.map((rec) => (
        <RecommendationItem key={rec._id} recommendation={rec} onEdit={openModal}/>
      ))}
    </ListGroup>
  );
});

export default RecommendationList;
