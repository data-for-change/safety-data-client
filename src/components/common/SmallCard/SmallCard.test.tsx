import React from 'react';
import { render, screen } from '@testing-library/react';
import SmallCard from './SmallCard';
import '@testing-library/jest-dom';

describe('SmallCard component', () => {
  it('renders children content', () => {
    render(<SmallCard>Test content</SmallCard>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders a header if provided', () => {
    render(<SmallCard header="Card Header">Body</SmallCard>);
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('does not render header elements when header prop is not passed', () => {
    const { container } = render(<SmallCard>Only Body</SmallCard>);
    expect(container.querySelector('h6')).toBeNull();
    expect(container.querySelector('hr')).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <SmallCard className="custom-class">Styled</SmallCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies default className when custom className is not provided', () => {
    const { container } = render(<SmallCard>Default Style</SmallCard>);
    expect(container.firstChild).toHaveClass('p-3', 'bg-white', 'rounded', 'shadow');
  });

});
