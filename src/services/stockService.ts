import { Stock, StocksResponse, SortField, SortOrder } from '../types/index';

const API_URL = 'https://dummyjson.com/products';

export const fetchStocks = async (
  search?: string,
  sortField?: SortField,
  sortOrder?: SortOrder
): Promise<StocksResponse> => {
  try {
    let url = API_URL;
    
    if (search && search.trim() !== '') {
      url = `${API_URL}/search?q=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stocks');
    }
    
    const data: StocksResponse = await response.json();
    
    if (sortField && sortOrder) {
      data.products = sortStocks(data.products, sortField, sortOrder);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export const fetchStockById = async (id: number): Promise<Stock> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock details');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching stock with id ${id}:`, error);
    throw error;
  }
};

const sortStocks = (stocks: Stock[], field: SortField, order: SortOrder): Stock[] => {
  return [...stocks].sort((a, b) => {
    if (field === SortField.TITLE) {
      return order === SortOrder.ASC
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      const aValue = a[field];
      const bValue = b[field];
      return order === SortOrder.ASC
        ? aValue - bValue
        : bValue - aValue;
    }
  });
};