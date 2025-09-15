import type { Request, Response } from 'express';
import { search } from './shared/clients';

type MovieDoc = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  plot: string;
  plotVector?: number[];
};

export async function recommend(req: Request, res: Response) {
  try {
    const movieId = (req.query.movieId as string) || '';
    const q = (req.query.q as string) || '';
    const k = Number((req.query.k as string) || 6);
    console.log('Received recommend request with movieId:', movieId, 'q:', q, 'k:', k);

    if (!movieId && !q) {
      return res.status(400).json({ error: 'movieId or q parameter is required' });
    }
    if (movieId) {
      const doc = (await search.getDocument(movieId)) as MovieDoc;
      const vector = doc.plotVector as number[] | undefined;
      console.log('Retrieved document for movieId:', movieId, 'with vector:', vector);
      if (!vector) return res.status(404).json({ error: 'Vector not found for movie' });

      // Use vectorSearchOptions (current SDK) instead of vectorQueries
      const results = await search.search('', {
        vectorSearchOptions: {
          queries: [
            {
              kind: 'vector',
              vector,
              kNearestNeighborsCount: k + 1,
              fields: ['plotVector'],
            },
          ],
        },
        select: ['id', 'title', 'year', 'genres', 'plot'],
      });

      const items: any[] = [];
      for await (const r of results.results) items.push({ score: r.score, ...r.document });
      const filtered = items.filter((x) => x.id !== movieId).slice(0, k);
      console.log('Returning filtered recommendations for movieId:', movieId, 'with results:', filtered); 
      return res.json(filtered);
    }

    // Text search fallback
    const results = await search.search(q, {
      top: k,
      select: ['id', 'title', 'year', 'genres', 'plot'],
    });
    console.log('Returning text search recommendations for query:', q, 'with results:', results);
    const items: any[] = [];
    for await (const r of results.results) items.push({ score: r.score, ...r.document });
    return res.json(items);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
