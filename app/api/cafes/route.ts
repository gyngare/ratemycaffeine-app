import { NextResponse } from "next/server";

const GOOGLE_PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const { city } = await req.json();
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 8);

  if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }

  let results: any[] = [];
  let nextPageToken: string | null = null;

  do {
    const params = new URLSearchParams({
      key: process.env.GOOGLE_MAPS_API_KEY!,
    });

    if (nextPageToken) {
      params.append("pagetoken", nextPageToken);
      await sleep(2000);
    } else {
      params.append("query", `cafes in ${city}`);
      params.append("type", "cafe");
    }

    const res = await fetch(`${GOOGLE_PLACES_URL}?${params.toString()}`);
    const data = await res.json();

    if (Array.isArray(data.results)) {
      results.push(
        ...data.results.map((place: any) => ({
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          googleRating: place.rating ?? null,
          ratingCount: place.user_ratings_total ?? 0,
          imageUrl: place.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
            : null,
        }))
      );
    }

    nextPageToken = data.next_page_token ?? null;
  } while (results.length < page * pageSize && nextPageToken);

  const start = (page - 1) * pageSize;
  const cafes = results.slice(start, start + pageSize);

  const totalPages = nextPageToken
    ? page + 1 // unknown but more pages exist
    : Math.ceil(results.length / pageSize);

  return NextResponse.json({
    cafes,
    page,
    totalPages,
  });
}
