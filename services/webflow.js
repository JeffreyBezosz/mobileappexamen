import {
  fallbackCampuses,
  fallbackNews,
  fallbackProducts,
} from "../data/fallbackData";

const SITE_ID = "6a1c4c3ee6ee256945bb0a0d";
const API_TOKEN = process.env.EXPO_PUBLIC_WEBFLOW_API_TOKEN || "";

const COLLECTION_IDS = {
  categories: "6a1dc34672b591bef6e05622",
  news: process.env.EXPO_PUBLIC_WEBFLOW_NEWS_COLLECTION_ID || "6a1dcbb77d13c67814495ff0",
  campuses: process.env.EXPO_PUBLIC_WEBFLOW_CAMPUSES_COLLECTION_ID || "6a1dcb5ff1218d8cf0595826",
};

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

const getImageUrl = (...values) => {
  const found = values.find(Boolean);
  if (!found) return null;
  return typeof found === "string" ? found : found.url || null;
};

async function fetchJson(url) {
  if (!API_TOKEN) {
    throw new Error("Geen Webflow API-token ingesteld.");
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Webflow fout: ${response.status}`);
  }
  return response.json();
}

async function getCategoryMap() {
  try {
    const data = await fetchJson(
      `https://api.webflow.com/v2/collections/${COLLECTION_IDS.categories}/items`
    );

    return (data.items || []).reduce((map, item) => {
      map[item.id] = item.fieldData?.name || "Webshop";
      return map;
    }, {});
  } catch (error) {
    console.warn(error.message);
    return {};
  }
}

export async function getProducts() {
  try {
    const [data, categoryMap] = await Promise.all([
      fetchJson(`https://api.webflow.com/v2/sites/${SITE_ID}/products`),
      getCategoryMap(),
    ]);

    return (data.items || []).map((item) => {
      const product = item.product || {};
      const sku = item.skus?.[0] || {};
      const productFields = product.fieldData || {};
      const skuFields = sku.fieldData || {};
      const categoryIds = productFields.category || [];
      const category = categoryIds.map((id) => categoryMap[id]).filter(Boolean).join(", ");

      return {
        id: product.id || item.id,
        title: (productFields.name || "Product").trim(),
        description: productFields.description || "",
        category: category || "Webshop",
        price: (skuFields.price?.value || 0) / 100,
        image: getImageUrl(
          productFields["main-image"],
          productFields.image,
          skuFields["main-image"],
          skuFields.image
        ),
      };
    });
  } catch (error) {
    console.warn(error.message);
    return fallbackProducts;
  }
}

export async function getNews() {
  if (!COLLECTION_IDS.news) return fallbackNews;

  try {
    const data = await fetchJson(
      `https://api.webflow.com/v2/collections/${COLLECTION_IDS.news}/items`
    );

    const articles = (data.items || []).map((item) => {
      const fields = item.fieldData || {};
      const rawDate = fields.datum || fields.date || "";
      const date = rawDate
        ? new Date(rawDate).toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "";

      return {
        id: item.id,
        title: fields.name || fields.title || "Nieuwsartikel",
        intro: fields.intro || fields.excerpt || fields.description || "",
        category: fields.categorie || fields.category || "Algemeen",
        campus: fields.campus || "",
        date,
        rawDate,
        image: getImageUrl(fields.img, fields.afbeelding, fields["main-image"], fields.image),
        content: String(fields.inhoud || fields.content || fields.body || "").replace(/<[^>]*>/g, " "),
      };
    });

    return articles.length ? articles : fallbackNews;
  } catch (error) {
    console.warn(error.message);
    return fallbackNews;
  }
}

export async function getCampuses() {
  if (!COLLECTION_IDS.campuses) return fallbackCampuses;

  try {
    const data = await fetchJson(
      `https://api.webflow.com/v2/collections/${COLLECTION_IDS.campuses}/items`
    );

    const campuses = (data.items || []).map((item) => {
      const fields = item.fieldData || {};
      return {
        id: item.id,
        name: fields.name || "Campus",
        focus: fields.focus || fields.richting || "",
        category: fields.category || fields.focus || "Campus",
        address: fields.adres || fields.address || "",
        image: getImageUrl(
          fields["image-campus"],
          fields.afbeelding,
          fields["main-image"],
          fields.image
        ),
        description: fields.description || fields.beschrijving || fields.focus || "",
      };
    });

    return campuses.length >= 8 ? campuses : fallbackCampuses;
  } catch (error) {
    console.warn(error.message);
    return fallbackCampuses;
  }
}
