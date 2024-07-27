import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTranslation } from "./helpers";
type TranslateState = {
  textToTranslate: string;
  translateLanguage: string;
  segmentLanguage: string;
  textTranslate:string;
  setTextToTranslate: (text: string) => void;
  setTranslateLanguage: (language: string) => void;
  setSegmentLanguage: (language: string) => void;
  toTranslateLanguage: () => Promise<void>;
};

export const useTranslateStore = create<TranslateState>()(
  devtools((set, get) => ({
    textToTranslate: "",
    translateLanguage: "",
    segmentLanguage: "",
    textTranslate: "",
    toTranslateLanguage: async () => {
      const translation = await getTranslation({
        text: get().textToTranslate,
        language: get().translateLanguage,
        segment:get().segmentLanguage,
      });

      set(() => ({textTranslate:translation?.translation}));

    },
    setTextToTranslate: (text) => {
      set(() => ({
        textToTranslate: text,
      }));
    },
    setTranslateLanguage: (language) => {
      set(() => ({ translateLanguage: language }));
    },
    setSegmentLanguage: (language) => {
      set(() => ({ segmentLanguage: language }));
    },
  }))
);
