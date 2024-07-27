import { FormEvent, useState } from "react";
import { copyText, lenguages, textToVoice } from "../helpers";
import soundMax from "/sound_max_fill.svg";
import copy from "/Copy.svg";
import alfa from "/Sort_alfa.svg";
import { useTranslateStore } from "../store";
export default function Translation() {
  const [object, setObject] = useState({
    text: "Hello, how are you",
    option: "",
    language: "en",
    quantityCharacters: 0,
  });

  const toTranslateLanguage = useTranslateStore(
    (state) => state.toTranslateLanguage
  );
  const setTranslateLanguage = useTranslateStore(
    (state) => state.setTranslateLanguage
  );
  const setTextToTranslate = useTranslateStore(
    (state) => state.setTextToTranslate
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if(object.language === ""){
        alert("Elija un idioma que está traduciendo");
        return;
    }
    e.preventDefault();
    setTextToTranslate(object.text);
    setTranslateLanguage(object.language);
    await toTranslateLanguage();
  };
  return (
    <div className="w-[400px] md:w-[550px]  h-[350px] rounded-3xl border border-[#4D5562] bg-[#1f2531cb]  p-5">
      <form
        className="mx-auto h-full flex flex-col justify-between overflow-x-auto"
        onSubmit={handleSubmit}
      >
        <div className="text-[#4D5562] text-sm  font-bold flex gap-5 pb-6 p-3 border-b-[1.8px] border-b-[#4D5562]">
          <button
            className={`${
              object.language === "detect" ? "bg-[#4D5562] text-white" : ""
            } rounded-lg p-2 transition-all`}
            type="button"
            onClick={() => {
              setObject((prev) => ({
                ...prev,
                language: "detect",
                option: "",
              }));
            }}
          >
            Detect Language
          </button>

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
            onChange={(e) => {
              setObject((prev) => ({
                ...prev,
                text: e.target.value,
                quantityCharacters: e.target.value.length,
              }));
            }}
            value={object.text}
            className="bg-transparent outline-none text-white w-full text-sm h-28"
            maxLength={500}
          ></textarea>
          <p className="relative left-[435px] text-[#4D5562] text-sm inline-block">
            {object.quantityCharacters}/500
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button type="button" onClick={() => {textToVoice(object.text)}}>
              <img
                className="p-2 border border-[#4D5562] transition-all hover:bg-[#373c44] rounded-lg"
                src={soundMax}
                alt="sound-max"
              />
            </button>

            <button type="button" onClick={() => {copyText(object.text)}}>
              <img
                className="p-2 ml-2 border border-[#4D5562] transition-all hover:bg-[#373c44] rounded-lg"
                src={copy}
                alt="sound-max"
              />
            </button>
          </div>
          <button
            className="text-white w-32 text-center flex items-center justify-center transition-all hover:bg-[#4e76ee] h-11 bg-[#3662E3] rounded-xl"
            type="submit"
          >
            <img src={alfa} alt="sort-alfa" />
            <span>Translate</span>
          </button>
        </div>
      </form>
    </div>
  );
}
