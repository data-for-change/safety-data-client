import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";
import { setBrowserQueryString } from "../../utils/queryStringUtils";

export interface appUiState {
  appInitialized: boolean;
  language: string;
  direction: "ltr" | "rtl";
  dataUpdatedTo: number | null;
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
  dataUpdatedTo: 1738281600,
  showFilterModal: false,
  initPage: false,
  currentPage: "home",
  currentTab: "charts",
  chartType: "BarChart",
  showPercentageChart: false,
  chartTypeList: ["BarChart", "PieChart"],
  isHeaderExpanded: false,
};

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
      setBrowserQueryString("tab", action.payload)
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
    setDataUpdatedTo: (state, action: PayloadAction<number>) => {
      state.dataUpdatedTo = action.payload;
    },
  },
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
  setDataUpdatedTo,
} = appUiSlice.actions;

export const selectDirection = (state: RootState) => state.appUi.direction;
export const selectLanguage = (state: RootState) => state.appUi.language;

export default appUiSlice.reducer;
