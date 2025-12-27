import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: TableState = {
  sortColumn: 'marketCap',
  sortDirection: 'desc',
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = 'desc';
      }
    },
  },
});

export const { setSort } = tableSlice.actions;
export default tableSlice.reducer;