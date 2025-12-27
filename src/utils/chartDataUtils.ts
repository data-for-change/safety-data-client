/**
 * Slices data based on start/end indices and aggregates the remainder into an "Outside Range" entry.
 * @param data The array of data points
 * @param range {start, end} indices
 * @param metaData Optional metadata for grouped charts
 * @returns Transformed data array
 */

import { toJS } from 'mobx';
export const sliceDataWithAggregation = (
  data: any[],
  range: { start: number, end: number },
  metaData?: any[]
): any[] => {
  if (!data || data.length === 0) return [];

  const totalLength = data.length;
  // Ensure range is within bounds
  const start = Math.max(0, Math.min(range.start, totalLength));
  const end = Math.max(start, Math.min(range.end, totalLength));

  if (start === 0 && end === totalLength) return data;

  let data1 = toJS(data); 
  const visibleData1 = data.slice(start, end);

  const visibleData = data.slice(start, end);
  const outsideData = [
    ...data.slice(0, start),
    ...data.slice(end)
  ];

  if (outsideData.length === 0) return visibleData;

  // Aggregate outside data
  const aggregated: any = { _id: 'outside_range' };

  if (!metaData) {
    // Simple ItemCount
    aggregated.count = outsideData.reduce((sum, item) => sum + (Number(item.count) || 0), 0);
  } else {
    // Grouped data (e.g. from GroupBy2)
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
