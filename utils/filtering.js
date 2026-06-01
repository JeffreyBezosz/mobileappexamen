export function getCategories(items, key = "category") {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))];
}

export function filterAndSort(items, searchQuery, selectedCategory, sortOption, titleKey = "title") {
  const query = searchQuery.trim().toLowerCase();

  return [...items]
    .filter((item) => {
      const title = String(item[titleKey] || "").toLowerCase();
      const description = String(item.description || item.intro || item.focus || "").toLowerCase();
      const matchesSearch = !query || title.includes(query) || description.includes(query);
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const nameA = String(a[titleKey] || "");
      const nameB = String(b[titleKey] || "");

      if (sortOption === "name-desc") return nameB.localeCompare(nameA);
      if (sortOption === "price-asc") return Number(a.price || 0) - Number(b.price || 0);
      if (sortOption === "price-desc") return Number(b.price || 0) - Number(a.price || 0);
      return nameA.localeCompare(nameB);
    });
}
