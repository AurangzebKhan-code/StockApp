import React from 'react';
import { FlatList, StyleSheet, Text, View, ListRenderItemInfo } from 'react-native';
import { Stock } from '../types/index';
import StockCard from './StockCard';
import LoadingIndicator from './LoadingIndicator';

interface StockListProps {
  stocks: Stock[];
  loading: boolean;
  error: Error | null;
  onSelectStock: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ 
  stocks, 
  loading, 
  error, 
  onSelectStock 
}) => {
  if (loading && stocks.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.errorMessage}>
          Error loading stocks: {error.message}
        </Text>
      </View>
    );
  }

  if (stocks.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.emptyMessage}>No stocks found</Text>
      </View>
    );
  }

  const renderItem = ({ item }: ListRenderItemInfo<Stock>) => (
    <StockCard stock={item} onPress={onSelectStock} />
  );

  return (
    <FlatList
      data={stocks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={loading ? <LoadingIndicator size="small" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyMessage: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StockList;