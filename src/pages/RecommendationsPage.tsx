import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Container, Form, Spinner, Button, ToastContainer, Toast } from 'react-bootstrap';
import { useStore } from '../stores/storeConfig';
import RecommendationList from '../components/recommendation/RecommendationList';
import RecommendationModal from '../components/recommendation/RecommendationModal';
import {tagsOptions} from '../stores/recommendation/tagsOptions';
import './RecommendationsPage.css';

const RecommendationsPage: React.FC = observer(() => {
  const { t } = useTranslation();
  const { recommendationStore, userStore } = useStore();
  const { selectedTag, setSelectedTag, fetchRecommendationsByTags, loading, openModal, successMessage, errorMessage, clearMessages } = recommendationStore;
  const { hasEditPermission } = userStore;
  
  useEffect(() => {
    fetchRecommendationsByTags(selectedTag);
  }, [selectedTag, fetchRecommendationsByTags]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timeout = setTimeout(() => clearMessages(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, errorMessage, clearMessages]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  return (
    <Container>
      <div className="recommendations-header">
        <h2 className="mt-4">{t('Recommendations')}</h2>
        {hasEditPermission &&
          <Button variant="success" onClick={() => openModal(undefined)} className="create-button">
            {t('Create Recommendation')}
          </Button>}
      </div>
      <Form.Group controlId="tagSelect" className="mb-3">
        <Form.Label>Select Tag:</Form.Label>
        <Form.Select value={selectedTag} onChange={handleChange}>
          {tagsOptions.map((tag) => (
            <option key={tag.value} value={tag.value}>
              {tag.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {loading ? <Spinner animation="border" /> : <RecommendationList />}
      <ToastContainer position="top-center" className="p-3 custom-toast-container" style={{ zIndex: 1100 }}>
        {successMessage && (
          <Toast show={true} onClose={clearMessages} bg="success" autohide delay={3000}>
            <Toast.Body style={{ color: 'white' }} >{t(successMessage)}</Toast.Body>
          </Toast>
        )}
        {errorMessage && (
          <Toast show={true} onClose={clearMessages} bg="danger" autohide delay={3000} >
            <Toast.Body>{t(errorMessage)}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
      <RecommendationModal />
    </Container>
  );
});

export default RecommendationsPage;
