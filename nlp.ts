const url: string =
  "https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/82aadae2-951c-4e08-a174-e0eb79f7004c/v1/analyze?version=2022-04-07";
const searchURL: string =
  "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&limit=1&format=json&search=";
const pageURL: string = "https://en.wikipedia.org/wiki/";

import apiKey from './config.ts'

export default async function analyze(term: string) {
  let u;
  try {
    let resp = await fetch(searchURL + term);
    let data = await resp.json();
    let title = data[1][0];
    u = pageURL + title;
  } catch (err) {
    throw new Error("Failed to fetch Wikipedia URL");
  }
  console.log(u)
  const parameters = {
    "url": u,
    "features": {
      "semantic_roles": {
        "entities": true
      }
    },
    "return_analyzed_text": true
  };
  console.log(parameters)
  console.log(url)
  const payload = {
    method: "POST",
    headers: {
      "Authorization":`Basic ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parameters)
  };
console.log(payload)
  let data = await fetch(url, payload);
  return await data.json();
}


