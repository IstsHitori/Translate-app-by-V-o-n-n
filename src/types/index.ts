import { InferOutput } from "valibot"
import { MatcheSchema, MatchesSchema } from "../schemas"
export type Lenguage = {
    name:string,
    value:string
}
export type Config = {
    text: string,
    language: string,
    segment:string
}
export type Matche = InferOutput<typeof MatcheSchema>;
export type Matches = InferOutput<typeof MatchesSchema>;