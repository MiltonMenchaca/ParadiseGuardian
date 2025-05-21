import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LogsState, SecurityLog } from '../../types';
import api from '../../services/api';

const initialState: LogsState = {
  logs: [],
  filteredLogs: [],
  currentLog: null,
  loading: false,
  error: null,
};

// Define error response type
interface ErrorResponse {
  error: string;
}

// Async thunks
export const fetchLogs = createAsyncThunk(
  'logs/fetchLogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<SecurityLog[]>('/api/logs');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.error || 'Error al obtener logs');
    }
  }
);

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<SecurityLog>) => {
      state.logs.unshift(action.payload);
      state.filteredLogs = [...state.logs]; // Actualizar logs filtrados
    },
    setCurrentLog: (state, action: PayloadAction<SecurityLog | null>) => {
      state.currentLog = action.payload;
    },
    filterLogs: (state, action: PayloadAction<{ level?: string; source?: string; search?: string }>) => {
      const { level, source, search } = action.payload;
      
      state.filteredLogs = state.logs.filter(log => {
        let matches = true;
        
        if (level && log.level !== level) {
          matches = false;
        }
        
        if (source && log.source !== source) {
          matches = false;
        }
        
        if (search && !log.message.toLowerCase().includes(search.toLowerCase())) {
          matches = false;
        }
        
        return matches;
      });
    },
    clearLogError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action: PayloadAction<SecurityLog[]>) => {
        state.loading = false;
        state.logs = action.payload;
        state.filteredLogs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addLog, setCurrentLog, filterLogs, clearLogError } = logsSlice.actions;
export default logsSlice.reducer;