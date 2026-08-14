const describeShape = (value: unknown): string => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

export const findCatalogParityErrors = (
  fallback: unknown,
  candidate: unknown,
  path = 'content',
): readonly string[] => {
  if (describeShape(fallback) !== describeShape(candidate)) {
    return [`${path}: expected ${describeShape(fallback)}, found ${describeShape(candidate)}`];
  }

  if (typeof fallback === 'string') {
    return typeof candidate === 'string' && candidate.trim().length > 0
      ? []
      : [`${path}: translation is empty`];
  }

  if (Array.isArray(fallback) && Array.isArray(candidate)) {
    if (fallback.length !== candidate.length) {
      return [`${path}: expected ${fallback.length} items, found ${candidate.length}`];
    }
    return fallback.flatMap((item, index) =>
      findCatalogParityErrors(item, candidate[index], `${path}[${index}]`),
    );
  }

  if (fallback && candidate && typeof fallback === 'object' && typeof candidate === 'object') {
    const fallbackRecord = fallback as Record<string, unknown>;
    const candidateRecord = candidate as Record<string, unknown>;
    const keys = new Set([...Object.keys(fallbackRecord), ...Object.keys(candidateRecord)]);
    return [...keys].flatMap((key) => {
      if (!(key in fallbackRecord)) return [`${path}.${key}: unexpected key`];
      if (!(key in candidateRecord)) return [`${path}.${key}: missing key`];
      return findCatalogParityErrors(
        fallbackRecord[key],
        candidateRecord[key],
        `${path}.${key}`,
      );
    });
  }

  return [];
};
