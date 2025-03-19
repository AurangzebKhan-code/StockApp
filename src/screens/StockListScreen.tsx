import React, { useState, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Stock, SortField, SortOrder } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { useFetchStocks } from '../hooks/useFetchStocks';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import StockList from '../components/StockList';
import { withErrorHandling } from '../utils/withErrorHandling';

type RootStackParamList = {
  StockList: undefined;
  StockDetail: { stockId: number };
};

type StockListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StockList'>;

const StockListScreen: React.FC = () => {
  const navigation = useNavigation<StockListScreenNavigationProp>();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>(SortField.TITLE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const { stocks, loading, error, totalStocks } = useFetchStocks(
    debouncedSearchQuery,
    sortField,
    sortOrder
  );

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSortChange = useCallback((field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  const handleSelectStock = useCallback((stock: Stock) => {
    navigation.navigate('StockDetail', { stockId: stock.id });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        value={searchQuery} 
        onChangeText={handleSearchChange} 
      />
      
      <SortOptions
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      
      <View style={styles.content}>
        <StockList
          stocks={stocks}
          loading={loading}
          error={error}
          onSelectStock={handleSelectStock}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
});

export default withErrorHandling(StockListScreen);