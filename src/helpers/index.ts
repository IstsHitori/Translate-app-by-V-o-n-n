import { MatchesSchema } from "../schemas";
import type { Lenguage, Config, Matche } from "../types";
import { safeParse } from "valibot";
export const lenguages: Lenguage[] = [
  {
    name: "spanish",
    value: "es",
  },
  {
    name: "italian",
    value: "it",
  },
];

export async function getTranslation(config: Config) {
  const url = `https://api.mymemory.translated.net/get?q=${config.text}&langpair=${config.language}|${config.segment}`;
  const response = await fetch(url);
  const data = await response.json();

  const result = safeParse(MatchesSchema, data.matches);
  
  if (result.success) {
    const betterResult = result.output.reduce((max: Matche, obj: Matche) =>
      Number(obj.quality) > Number(max.quality) ? obj : max
    );
    return betterResult;    
  }
}

export async function  copyText(value:string) {
    try{
        await navigator.clipboard.writeText(value);
        alert("texto copiado al portapapeles")
    }catch(error){
        console.log(error);
        
    }
}

export function textToVoice(text:string){
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);

    synth.speak(utterThis);
}