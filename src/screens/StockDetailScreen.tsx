import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { fetchStockById } from '../services/stockService';
import { Stock } from '../types';
import LoadingIndicator from '../components/LoadingIndicator';
import { formatCurrency } from '../utils/formatters';
import { withErrorHandling } from '../utils/withErrorHandling';

type RootStackParamList = {
  StockDetail: { stockId: number };
};

type StockDetailScreenRouteProp = RouteProp<RootStackParamList, 'StockDetail'>;

const StockDetailScreen: React.FC = () => {
  const route = useRoute<StockDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { stockId } = route.params;
  
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadStockDetails = async () => {
      try {
        setLoading(true);
        const stockData = await fetchStockById(stockId);
        setStock(stockData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load stock details'));
        console.error('Error fetching stock details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStockDetails();
  }, [stockId]);

  const handleImagePress = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !stock) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || 'Failed to load stock details'}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const mainImage = stock.images[selectedImageIndex] || stock.thumbnail;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="cover" />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageGallery}
        >
          {stock.images.map((image, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleImagePress(index)}
              style={[
                styles.thumbnailContainer,
                selectedImageIndex === index && styles.selectedThumbnail
              ]}
            >
              <Image
                source={{ uri: image }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{stock.title}</Text>
            <Text style={styles.price}>{formatCurrency(stock.price)}</Text>
          </View>
          
          <Text style={styles.brand}>{stock.brand}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rating</Text>
              <Text style={styles.statValue}>{stock.rating}/5</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Stock</Text>
              <Text 
                style={[
                  styles.statValue, 
                  stock.stock > 50 ? styles.inStock : styles.lowStock
                ]}
              >
                {stock.stock}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Discount</Text>
              <Text style={[styles.statValue, styles.discountValue]}>
                {stock.discountPercentage}%
              </Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{stock.description}</Text>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{stock.category}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mainImage: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#f0f0f0',
  },
  imageGallery: {
    padding: 10,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: '#0066cc',
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  inStock: {
    color: '#2e7d32',
  },
  lowStock: {
    color: '#ed6c02',
  },
  discountValue: {
    color: '#d32f2f',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  category: {
    fontSize: 14,
    backgroundColor: '#e3f2fd',
    color: '#0066cc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default withErrorHandling(StockDetailScreen);