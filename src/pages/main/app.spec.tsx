import React from 'react';
import { render } from '@testing-library/react';

test('test', () => {
  render(<p>1</p>);
  expect(1).toEqual(1);
});