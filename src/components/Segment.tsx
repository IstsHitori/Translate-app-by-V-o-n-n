import { useState } from "react";
import soundMax from "/sound_max_fill.svg";
import copy from "/Copy.svg";
import { lenguages, textToVoice } from "../helpers";
import { useTranslateStore } from "../store";
import { useMemo } from "react";
import { copyText } from "../helpers";

export default function Segment() {
  const [object, setObject] = useState({
    text: "",
    option: "",
    language: "fr",
    quantityCharacters: 0,
  });
  const setSegmentLanguage = useTranslateStore(
    (state) => state.setSegmentLanguage
  );
  const textTranslate = useTranslateStore(
    (state) => state.textTranslate
  );

  useMemo(
    () => setSegmentLanguage(object.language),
    [object.language, setSegmentLanguage]
  );
  return (
    <div className="w-[400px] md:w-[550px]  h-[350px] rounded-3xl border border-[#4D5562] bg-[#1f2531cb]  p-5">
      <div className="mx-auto h-full flex flex-col justify-between  overflow-hidden">
        <div className="text-[#4D5562] text-sm  font-bold flex gap-5 pb-6 p-3 border-b-[1.8px] border-b-[#4D5562]">
          <button
            className={`${
              object.language === "en" ? "bg-[#4D5562] text-white" : ""
            } rounded-lg p-2 transition-all`}
            type="button"
            onClick={() => {
              setObject((prev) => ({ ...prev, language: "en", option: "" }));
            }}
          >
            English
          </button>

          <button
            className={`${
              object.language === "fr" ? "bg-[#4D5562] text-white" : ""
            } rounded-lg p-2 transition-all`}
            type="button"
            onClick={() => {
              setObject((prev) => ({ ...prev, language: "fr", option: "" }));
            }}
          >
            French
          </button>

          <select
            className={`${
              object.option === "select" ? "bg-[#4D5562] text-white" : ""
            } rounded-lg p-2 bg-transparent outline-none transition-all`}
            onChange={(e) => {
              setObject((prev) => ({
                ...prev,
                language: e.target.value,
                option: "select",
              }));
            }}
          >
            <option value="">Select a language</option>
            {lenguages.map((lenguage) => (
              <option key={lenguage.value} value={lenguage.value}>
                {lenguage.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-3 relative">
          <textarea
            disabled={true}
            value={textTranslate}
            className="bg-transparent outline-none text-white w-full text-sm h-28"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button type="button" onClick={() => {textToVoice(textTranslate)}}>
              <img
                className="p-2 border border-[#4D5562] transition-all hover:bg-[#373c44] rounded-lg"
                src={soundMax}
                alt="sound-max"
              />
            </button>

            <button type="button" onClick={() => {copyText(textTranslate)}}>
              <img
                className="p-2 ml-2 border border-[#4D5562] transition-all hover:bg-[#373c44] rounded-lg"
                src={copy}
                alt="sound-max"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
