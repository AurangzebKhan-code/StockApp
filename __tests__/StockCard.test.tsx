import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StockCard from '../src/components/StockCard';
import { Stock } from '../src/types';

const mockStock: Stock = {
  id: 1,
  title: 'Test Stock',
  description: 'This is a test stock',
  price: 99.99,
  discountPercentage: 5.5,
  rating: 4.2,
  stock: 25,
  brand: 'Test Brand',
  category: 'electronics',
  thumbnail: 'https://example.com/thumbnail.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

describe('StockCard Component', () => {
  it('renders correctly with provided props', () => {
    const { getByText } = render(
      <StockCard stock={mockStock} onPress={() => {}} />
    );

    expect(getByText('Test Stock')).toBeTruthy();
    expect(getByText('Test Brand')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByText('Rating: 4.2/5')).toBeTruthy();
    expect(getByText('Low Stock: 25')).toBeTruthy();
  });

  it('calls onPress with stock when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <StockCard stock={mockStock} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Stock'));
    
    expect(mockOnPress).toHaveBeenCalledWith(mockStock);
  });
});