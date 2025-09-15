import fs from 'node:fs/promises';
import path from 'node:path';
import { aoai, search, AOAI_EMBED_MODEL } from '../shared/clients';

async function embed(text: string): Promise<number[]> {
  const res = await aoai.embeddings.create({
    model: AOAI_EMBED_MODEL, // this is your deployment name
    input: text,
  });
  return res.data[0].embedding as number[];
}

async function main() {
  const dataPath = path.resolve(process.cwd(), '../data/movies-mini.json');
  const raw = await fs.readFile(dataPath, 'utf-8');
  const movies = JSON.parse(raw) as Array<{
    id: string;
    title: string;
    year: number;
    genres: string[];
    plot: string;
  }>;

  const docs: any[] = [];
  for (const m of movies) {
    const text = `${m.title}. ${m.genres?.join(', ')}. ${m.plot}`;
    const vector = await embed(text);
    docs.push({ ...m, plotVector: vector });
  }

  const res = await search.mergeOrUploadDocuments(docs);
  console.log(`Uploaded ${res.results.length} docs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
