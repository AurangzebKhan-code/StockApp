import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={() => {}} />
    );
    
    expect(getByPlaceholderText('Search stocks...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={() => {}} placeholder="Custom placeholder" />
    );
    
    expect(getByPlaceholderText('Custom placeholder')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Search stocks...');
    fireEvent.changeText(input, 'Apple');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('Apple');
  });

  it('displays the provided value', () => {
    const { getByDisplayValue } = render(
      <SearchBar value="Initial value" onChangeText={() => {}} />
    );
    
    expect(getByDisplayValue('Initial value')).toBeTruthy();
  });
});