import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import MySelect from './MySelect';
import '@testing-library/jest-dom';

describe('MySelect', () => {
  const options = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
  ];

  it('renders options and label', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MySelect
          data={options}
          valProp="id"
          contentProp="name"
          label="Select Fruit"
          id="fruit-select"
          onChange={() => {}}
        />
      </I18nextProvider>
    );

    // label is rendered
    expect(screen.getByLabelText('Select Fruit')).toBeInTheDocument();

    // options are rendered
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();

    render(
      <MySelect
        data={options}
        valProp="id"
        contentProp="name"
        label="Fruit"
        onChange={handleChange}
        value="1"
      />
    );

    const select = screen.getByLabelText('Fruit');
    fireEvent.change(select, { target: { value: '2' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
