import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StockListScreen from '../screens/StockListScreen';
import StockDetailScreen from '../screens/StockDetailScreen';

export type RootStackParamList = {
  StockList: undefined;
  StockDetail: { stockId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StockList">
        <Stack.Screen 
          name="StockList" 
          component={StockListScreen} 
          options={{ title: 'Stock Market' }}
        />
        <Stack.Screen 
          name="StockDetail" 
          component={StockDetailScreen} 
          options={{ title: 'Stock Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;