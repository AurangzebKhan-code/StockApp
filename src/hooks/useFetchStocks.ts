import { useState, useEffect } from 'react';
import { Stock, SortField, SortOrder } from '../types/index';
import { fetchStocks } from '../services/stockService';

export const useFetchStocks = (
  searchQuery: string,
  sortField?: SortField,
  sortOrder?: SortOrder
) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalStocks, setTotalStocks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchStocks(searchQuery, sortField, sortOrder);
        setStocks(response.products);
        setTotalStocks(response.total);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, sortField, sortOrder]);

  return { stocks, loading, error, totalStocks };
};