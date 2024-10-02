import { Data } from "./data";

export interface OTPIdentifier extends Data {
    
    "data": Data["data"] & {
    "attributes": {
      "identifier": string
    }
  }
}
