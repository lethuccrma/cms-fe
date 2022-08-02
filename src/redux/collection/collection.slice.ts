import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection } from '../../types/ICollection';

const initialState: ICollection[] = [];

export const CollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<ICollection[]>) => (action.payload),
  },
});

export default CollectionSlice;
