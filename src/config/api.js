import axios from 'axios';
import Unsplash from 'unsplash-js';

export const HTTP = axios.create({
  baseURL: `https://api.unsplash.com`,
  headers: {
    Authorization: 'e4a59905c6ac8fbf552a81cfb404c09fd774d7684f9ea8b73d39f879115a6fae'
  }
})

export const unsplash = new Unsplash({
  applicationId: "e4a59905c6ac8fbf552a81cfb404c09fd774d7684f9ea8b73d39f879115a6fae",
  secret: "d0f12ca51f06f2d2bc981b5f172204a167000590542428dbcb20266e5a9e9f76",
  callbackUrl: "{CALLBACK_URL}"
});