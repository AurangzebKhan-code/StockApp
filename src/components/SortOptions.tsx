import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SortField, SortOrder } from '../types';

interface SortOptionsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const SortOptions = memo(({ sortField, sortOrder, onSortChange }: SortOptionsProps) => {
  const toggleOrder = () => {
    const newOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    onSortChange(sortField, newOrder);
  };

  const changeField = (field: SortField) => {
    onSortChange(field, sortField === field ? sortOrder : SortOrder.ASC);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, sortField === SortField.TITLE && styles.activeButton]}
          onPress={() => changeField(SortField.TITLE)}
        >
          <Text style={styles.buttonText}>Name</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, sortField === SortField.PRICE && styles.activeButton]}
          onPress={() => changeField(SortField.PRICE)}
        >
          <Text style={styles.buttonText}>Price</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, sortField === SortField.RATING && styles.activeButton]}
          onPress={() => changeField(SortField.RATING)}
        >
          <Text style={styles.buttonText}>Rating</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.orderButton} onPress={toggleOrder}>
        <Text style={styles.orderButtonText}>
          {sortOrder === SortOrder.ASC ? '↑ Ascending' : '↓ Descending'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  activeButton: {
    backgroundColor: '#0066cc',
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
  },
  orderButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderButtonText: {
    fontSize: 12,
  },
});

export default SortOptions;