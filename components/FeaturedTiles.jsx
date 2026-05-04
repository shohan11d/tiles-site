import Link from "next/link";

async function getFeaturedTiles() {
  try {
    const res = await fetch("http://localhost:4000/data", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch tiles");
    const result = await res.json();
    return result.tiles.slice(0, 4); // Get top 4 tiles
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function FeaturedTiles() {
  const tiles = await getFeaturedTiles();

  return (
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Featured Tiles</h2>
            <p className="text-neutral-400 max-w-md">
              Hand-picked selections from our premium collection, chosen for their 
              exceptional quality and unique aesthetic.
            </p>
          </div>
          <Link 
            href="/tiles" 
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-2"
          >
            View All Tiles <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiles.length > 0 ? (
            tiles.map((tile) => (
              <div 
                key={tile.id} 
                className="group flex flex-col bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {/* Image Placeholder/Container */}
                <div className="aspect-square bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="text-neutral-500 font-medium">Image: {tile.title}</span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      {tile.category}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      ${tile.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {tile.title}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">
                    {tile.description}
                  </p>
                  <Link
                    href={`/tiles/${tile.id}`}
                    className="w-full py-3 px-4 bg-white text-black text-center text-sm font-bold rounded-xl transition-all hover:bg-indigo-500 hover:text-white active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-neutral-500">No tiles found. Please ensure your JSON server is running on port 4000.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
