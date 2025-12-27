/**
 * Slices data based on start/end indices and aggregates the remainder into an "Outside Range" entry.
 * @param data The array of data points
 * @param range {start, end} indices
 * @param metaData Optional metadata for grouped charts
 * @returns Transformed data array
 */

export const sliceDataWithAggregation = (
  data: any[],
  range: { start: number, end: number },
  metaData?: any[]
): any[] => {
  if (!data || data.length === 0) return [];

  const getItemValue = (item: any) => {
    if (item.count !== undefined) return Number(item.count);
    if (metaData) {
      // Find the maximum value among all grouped datasets for this item
      return Math.max(...metaData.map(m => Number(item[m.key]) || 0));
    }
    return 0;
  };

  const visibleData = data.filter(item => {
    const val = getItemValue(item);
    return val >= range.start && val <= range.end;
  });

  const outsideData = data.filter(item => {
    const val = getItemValue(item);
    return val < range.start || val > range.end;
  });

  if (outsideData.length === 0) return visibleData;

  // Aggregate outside data
  const aggregated: any = { _id: 'outside_range' };

  if (!metaData) {
    aggregated.count = outsideData.reduce((sum, item) => sum + getItemValue(item), 0);
  } else {
    metaData.forEach((meta) => {
      aggregated[meta.key] = outsideData.reduce((sum, item) => sum + (Number(item[meta.key]) || 0), 0);
    });
  }

  return [...visibleData, aggregated];
};

/**
 * Formats count precision for display.
 */
export const formatDataPrecision = (data: any[]) => {
  return data.map((x) => {
    if (typeof x.count === 'number' && !Number.isInteger(x.count)) {
      return { ...x, count: Number(x.count.toFixed(1)) };
    }
    return x;
  });
};
