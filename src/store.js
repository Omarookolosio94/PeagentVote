import { writable } from "svelte/store";

export const loading = writable(false);
export const profile = writable(null);
export const about = writable(null);
export const pageNo = writable(null);
export const loadedArticles = writable(null);
export const category = writable(null);
export const profileId = writable(null);
export const alertMsg = writable(null);
export const articleId = writable(null);
