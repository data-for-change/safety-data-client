import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Container, Form, Spinner } from 'react-bootstrap';
import RecommendationList from '../components/recommendation/RecommendationList';
import { useStore } from '../stores/storeConfig';

const tagsOptions = [
  { value: 'הולכי רגל', label: 'הולכי רגל' },
  { value: 'אופניים', label: 'אופניים' },
  { value: 'קורקינטים', label: 'קורקינטים' },
  { value: 'אופנועים', label: 'אופנועים' },
  { value: 'מכוניות', label: 'מכוניות' },
  { value: 'משאיות', label: 'משאיות' },
  { value: 'אוטובוסים', label: 'אוטובוסים' },
];

const RecommendationsPage: React.FC = observer(() => {
  const { t } = useTranslation();
  const { recommendationStore } = useStore();
  const [selectedTag, setSelectedTag] = useState(tagsOptions[0].value);

  useEffect(() => {
    recommendationStore.fetchRecommendationsByTags(selectedTag);
  }, [selectedTag]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  return (
    <Container>
      <h2 className="mt-4">{t('Recommendations')}</h2>

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

      {recommendationStore.loading ? <Spinner animation="border" /> : <RecommendationList />}
    </Container>
  );
});

export default RecommendationsPage;
