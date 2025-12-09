import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import AccidentService from "../../services/AccidentService";
import logger from "../../services/logger";
import { store as mobxStore } from '../storeConfig';
import {
  setLanguage,
  setDirection,
  setHeaderExpanded,
  setDataUpdatedTo,
  setCurrentTab,
} from "./appUiSlice";

// Async thunk to handle language change side effect
export const updateLanguage = createAsyncThunk<void, string>(
  "ui/updateLanguage",
  async (lang, { dispatch }) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("lang", JSON.stringify(lang));
    dispatch(setLanguage(lang));
    dispatch(setDirection(lang === "en" ? "ltr" : "rtl"));
    dispatch(setHeaderExpanded(false));
  }
);

export const initLang = createAsyncThunk("appUi/initLang", async (_, { dispatch }) => {
  try {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      const parsedLang = JSON.parse(storedLang);
      dispatch(updateLanguage(parsedLang));
    }
  } catch (error) {
    logger.log(error);
  }
});

export const fetchLatestCbsUpdate = createAsyncThunk<number>(
  "appUi/fetchLatestCbsUpdate",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AccidentService.getLatestCbsUpdateDate();
      dispatch(setDataUpdatedTo(response.last_update));
      return response.last_update;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setStoreByQuery = createAsyncThunk(
  "appUi/setStoreByQuery",
  async ({ defaultTab, defaultCity }: { defaultTab: string; defaultCity?: string }, { dispatch }) => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || defaultTab;
    if (tab) {
      dispatch(setCurrentTab(tab));
    }
    mobxStore.filterStore.setStoreByQuery(params, defaultCity);
    mobxStore.mapStore.setStoreByQuery(params);
  }
);
