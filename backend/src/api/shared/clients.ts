import 'dotenv/config';
import { AzureOpenAI } from 'openai';
import {
  SearchClient,
  SearchIndexClient,
  AzureKeyCredential as SearchKey,
} from '@azure/search-documents';

const SEARCH_ENDPOINT = process.env.SEARCH_ENDPOINT!;
const SEARCH_API_KEY = process.env.SEARCH_API_KEY!;
export const SEARCH_INDEX_NAME = process.env.SEARCH_INDEX_NAME || 'movies';

const AOAI_ENDPOINT = process.env.AOAI_ENDPOINT!;
const AOAI_KEY = process.env.AOAI_KEY!;
export const AOAI_EMBED_MODEL = process.env.AOAI_EMBED_MODEL!; // deployment name

// Azure AI Search clients
export const searchIndex = new SearchIndexClient(
  SEARCH_ENDPOINT,
  new SearchKey(SEARCH_API_KEY)
);
export const search = new SearchClient(
  SEARCH_ENDPOINT,
  SEARCH_INDEX_NAME,
  new SearchKey(SEARCH_API_KEY)
);

// Azure OpenAI (embeddings) client
export const aoai = new AzureOpenAI({
  endpoint: AOAI_ENDPOINT,
  apiKey: AOAI_KEY,
  apiVersion: '2024-10-21', // or a recent supported version in your region
});
