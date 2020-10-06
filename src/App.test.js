import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

test('renders the correct content', () => {
  const { getByLabelText, getByText } = render(<App />);

  getByText("Elder Scrolls");
  getByLabelText("Search by name:");
});

test('renders loading state', () => {
  const { getByText } = render(<App />);

  getByText("Loading");
});

// test('allows users to search for cards', () => {
//   const { getByLabelText, getByText } = render(<App />);

//   const input = getByLabelText("Search by name:");
//   fireEvent.change(input, { target: { value: "ex" }})

//   getByText("ex");
// });
