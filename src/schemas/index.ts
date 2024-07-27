import {string,array, object,number, union} from "valibot";

export const MatcheSchema = object({
    id:union([string(),number()]),
    segment:string(),
    quality:union([number(),string()]),
    translation:string()
})
export const MatchesSchema = array(MatcheSchema);