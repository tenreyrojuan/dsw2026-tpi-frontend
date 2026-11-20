export function SpecialtyFilter({ specialties, searchTerm }) {
  if (specialties.length === 0) {
    return [];
  }

  const term = searchTerm.toLowerCase();

  return specialties.filter(
    (item) =>
      item.name?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
  );
}