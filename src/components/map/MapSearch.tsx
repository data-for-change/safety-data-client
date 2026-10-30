import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Form, ListGroup } from 'react-bootstrap';
import { store } from '../../stores/storeConfig';
import { GOOGLE_MAPS_API_KEY } from '../../utils/globalEnvs';
import logger from '../../services/logger';

const PLACES_URL = 'https://places.googleapis.com/v1/places';
const DEBOUNCE_MS = 250;
const MIN_CHARS = 2;

interface ISuggestion {
  placeId: string;
  text: string;
}

const newSessionToken = () => crypto.randomUUID();

/// search box with live suggestions (Google Places Autocomplete, new API)
/// that moves the map to the selected place
const MapSearch: FC = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = store;
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [error, setError] = useState('');
  const [showList, setShowList] = useState(false);
  // one session = typing + the final place pick (billed together by Google)
  const sessionToken = useRef(newSessionToken());
  const requestId = useRef(0);

  useEffect(() => {
    const text = query.trim();
    if (!showList || text.length < MIN_CHARS || !GOOGLE_MAPS_API_KEY) {
      setSuggestions([]);
      return;
    }
    const id = ++requestId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${PLACES_URL}:autocomplete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY },
          body: JSON.stringify({
            input: text,
            sessionToken: sessionToken.current,
            includedRegionCodes: ['il'],
            languageCode: document.documentElement.lang || 'en',
          }),
        });
        const data = await res.json();
        if (id !== requestId.current) return; // a newer query superseded this one
        if (!res.ok) {
          setError(data.error?.message ?? 'Search failed');
          setSuggestions([]);
          return;
        }
        setError('');
        setSuggestions(
          (data.suggestions ?? [])
            .filter((s: any) => s.placePrediction)
            .map((s: any) => ({
              placeId: s.placePrediction.placeId,
              text: s.placePrediction.text.text,
            })),
        );
      } catch (err) {
        logger.error(err);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, showList]);

  const handleSelect = async (s: ISuggestion) => {
    setShowList(false);
    setQuery(s.text);
    setSuggestions([]);
    try {
      const res = await fetch(
        `${PLACES_URL}/${s.placeId}?sessionToken=${sessionToken.current}`,
        { headers: { 'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY, 'X-Goog-FieldMask': 'location' } },
      );
      const data = await res.json();
      if (!res.ok || !data.location) {
        setError(data.error?.message ?? 'Place not found');
        return;
      }
      setError('');
      mapStore.goToPlace(data.location.latitude, data.location.longitude, s.text);
    } catch (err) {
      logger.error(err);
      setError('Search failed');
    } finally {
      sessionToken.current = newSessionToken(); // session ends after the place pick
    }
  };

  const handleClear = () => {
    setQuery('');
    setError('');
    setSuggestions([]);
    mapStore.clearSearchedPlace();
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, width: 300, maxWidth: '60%' }}>
      <Form onSubmit={(e) => { e.preventDefault(); if (suggestions[0]) handleSelect(suggestions[0]); }}>
        <div style={{ position: 'relative' }}>
          <Form.Control
            size='sm'
            type='text'
            style={{ paddingInlineEnd: '1.75rem' }}
            placeholder={t('MapSearchPlaceholder')}
            value={query}
            autoComplete='off'
            onChange={(e) => { setQuery(e.target.value); setShowList(true); }}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)} // let a click on the list land first
          />
          {(mapStore.searchedPlace || query) && (
            <button
              type='button'
              className='btn-close'
              aria-label='Clear search'
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
              style={{ position: 'absolute', top: '50%', insetInlineEnd: '0.5rem', transform: 'translateY(-50%)', fontSize: '0.6rem' }}
            />
          )}
        </div>
      </Form>
      {showList && suggestions.length > 0 && (
        <ListGroup className='mt-1 shadow-sm'>
          {suggestions.map((s) => (
            <ListGroup.Item
              key={s.placeId}
              action
              className='py-1 small'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(s)}
            >
              {s.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {error && <div className='bg-white text-danger small px-2 py-1 mt-1 rounded'>{error}</div>}
    </div>
  );
});

export default MapSearch;
