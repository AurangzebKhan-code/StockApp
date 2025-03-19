import React, { memo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Stock } from '../types';
import { formatCurrency } from '../utils/formatters';

interface StockCardProps {
  stock: Stock;
  onPress: (stock: Stock) => void;
}

const StockCard = memo(({ stock, onPress }: StockCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(stock)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: stock.thumbnail }} 
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>{stock.title}</Text>
        <Text style={styles.brand}>{stock.brand}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.price}>{formatCurrency(stock.price)}</Text>
          <Text style={styles.rating}>Rating: {stock.rating}/5</Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={[
            styles.stockStatus, 
            stock.stock > 50 ? styles.inStock : styles.lowStock
          ]}>
            {stock.stock > 50 ? 'In Stock' : `Low Stock: ${stock.stock}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  thumbnail: {
    width: width * 0.25,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066cc',
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inStock: {
    backgroundColor: '#e6f7e9',
    color: '#2e7d32',
  },
  lowStock: {
    backgroundColor: '#fff8e6',
    color: '#ed6c02',
  },
});

export default StockCard;