import { Data } from "./data"

export interface Credentials {
    "data": Data["data"] & {
    "attributes": {
      "identifier": string,
      "password": string,
    }
  }
}