import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import { setBrowserQueryString } from "../../utils/queryStringUtils";
import AccidentService from "../../services/AccidentService";
import logger from "../../services/logger";
import { store as mobxStore } from '../storeConfig';
import { RootState } from "../store";

interface appUiState {
  appInitialized: boolean;
  language: string;
  direction: "ltr" | "rtl";
  dataUpdatedTo: number|null; //epochSeconds
  showFilterModal: boolean;
  initPage: boolean;
  currentPage: string;
  currentTab: string;
  chartType: string;
  showPercentageChart: boolean;
  chartTypeList: string[];
  isHeaderExpanded: boolean;
}

const initialState: appUiState = {
  appInitialized: false,
  language: "he",
  direction: "rtl",
  dataUpdatedTo: null,
  showFilterModal: false,
  initPage: false,
  currentPage: "home",
  currentTab: "charts",
  chartType: "BarChart",
  showPercentageChart: false,
  chartTypeList: ["BarChart", "PieChart"],
  isHeaderExpanded: false,
};

// Async thunk to handle language change side effect
export const updateLanguage = createAsyncThunk<void, string>(
  "ui/updateLanguage",
  async (lang: string, { dispatch }) => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem("lang", JSON.stringify(lang));
      dispatch(setLanguage(lang));
      dispatch(setDirection(lang === "en" ? "ltr" : "rtl"));
      dispatch(setHeaderExpanded(false));
    } catch (error) {
      console.error("Failed to update language:", error);
    }
  }
);

export const initLang = createAsyncThunk('appUi/initLang', async (_, { dispatch }) => {
    try {
      const storedLang = localStorage.getItem('lang');
      if (storedLang) {
        const parsedLang = JSON.parse(storedLang);
        dispatch(updateLanguage(parsedLang)); // Dispatch language update
      }
    } catch (error) {
      logger.log(error);
    }
  });

export const fetchLatestCbsUpdate = createAsyncThunk<number>(
  "appUi/fetchLatestCbsUpdate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AccidentService.getLatestCbsUpdateDate();
      const epochSeconds = response.data.last_update;
      return epochSeconds;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);  

const appUiSlice = createSlice({
  name: "appUi",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      // Update the HTML element directly
      document.documentElement.lang = action.payload;
    },
    setDirection: (state, action: PayloadAction<"ltr" | "rtl">) => {
      state.direction = action.payload;
       // Update the HTML element directly
       document.documentElement.dir = action.payload;
    },
    setShowFilterModal: (state, action: PayloadAction<boolean>) => {
      state.showFilterModal = action.payload;
    },
    setInitPage: (state, action: PayloadAction<boolean>) => {
      state.initPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
      setBrowserQueryString("tab", action.payload);
    },
    updateChartType: (state, action: PayloadAction<string>) => {
      state.chartType = action.payload;
    },
    updateShowPercentageChart: (state, action: PayloadAction<boolean>) => {
      state.showPercentageChart = action.payload;
    },
    setHeaderExpanded: (state, action: PayloadAction<boolean>) => {
      state.isHeaderExpanded = action.payload;
    },
    toggleHeaderExpanded: (state) => {
      state.isHeaderExpanded = !state.isHeaderExpanded;
    },
    setStoreByQuery: (state, action: PayloadAction<{ defaultTab: string; defaultCity?: string }>) => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab") || action.payload.defaultTab;  
        if (tab) {
          state.currentTab = tab; 
        }  
        // Sync with MobX store (temporary)
        mobxStore.filterStore.setStoreByQuery(params, action.payload.defaultCity);
        mobxStore.mapStore.setStoreByQuery(params);
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestCbsUpdate.fulfilled, (state, action) => {
      console.log ('fetchLatestCbsUpdate', action.payload)
      state.dataUpdatedTo = action.payload;
    });
  }
});

export const {
  setLanguage,
  setDirection,
  setShowFilterModal,
  setInitPage,
  setCurrentPage,
  setCurrentTab,
  updateChartType,
  updateShowPercentageChart,
  setHeaderExpanded,
  toggleHeaderExpanded,
  setStoreByQuery,
} = appUiSlice.actions;

export const selectDirection = (state: RootState) => state.appUi.direction;
export const selectLanguage = (state: RootState) => state.appUi.language;
export default appUiSlice.reducer;
