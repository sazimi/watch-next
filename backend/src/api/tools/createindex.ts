import { searchIndex, SEARCH_INDEX_NAME } from '../shared/clients';

async function main() {
  try {
    try { await searchIndex.deleteIndex(SEARCH_INDEX_NAME); } catch {}

    await searchIndex.createIndex({
      name: SEARCH_INDEX_NAME,
      fields: [
        { name: 'id', type: 'Edm.String', key: true, filterable: true },
        { name: 'title', type: 'Edm.String', searchable: true },
        { name: 'year', type: 'Edm.Int32', filterable: true, sortable: true, facetable: true },
        { name: 'genres', type: 'Collection(Edm.String)', searchable: true, filterable: true, facetable: true },
        { name: 'plot', type: 'Edm.String', searchable: true },
        { name: 'plotVector', type: 'Collection(Edm.Single)', searchable: true, vectorSearchDimensions: 3072, vectorSearchProfileName: 'v1' }
      ],
      vectorSearch: {
        algorithms: [{ name: 'hnsw', kind: 'hnsw' }],
        profiles: [{ name: 'v1', algorithmConfigurationName: 'hnsw' }]
      }
    });

    console.log(`Index '${SEARCH_INDEX_NAME}' created.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
