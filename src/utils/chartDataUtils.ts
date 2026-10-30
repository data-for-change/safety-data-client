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
 * Last completed month (1-12) of the latest update date (epoch seconds, `last_update` of
 * /api/latest-cbs-update-date), in Israel time. The comparison period counts months 1..this month
 * of each year. The update month counts only if the date is its last day, otherwise the month
 * before it. Returns 0 if unknown or if no month of the year is complete yet.
 */
export const getComparisonEndMonth = (updatedToSec: number | null | undefined): number => {
  if (!updatedToSec) return 0;
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Jerusalem',
  }).formatToParts(new Date(updatedToSec * 1000));
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value);
  const year = get('year'), month = get('month'), day = get('day');
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return day === daysInMonth ? month : month - 1;
};

/**
 * Align comparison-period counts to the main chart items (same order, missing -> 0).
 * The 'outside_range' item gets the comparison total of every category not shown as a bar.
 */
export const alignCompareData = (chartData: any[], compareData: any[]): any[] => {
  const compareById = new Map(compareData.map(x => [String(x._id), Number(x.count) || 0]));
  const visibleIds = new Set(chartData.filter(x => x._id !== 'outside_range').map(x => String(x._id)));
  const outsideCount = compareData
    .filter(x => !visibleIds.has(String(x._id)))
    .reduce((sum, x) => sum + (Number(x.count) || 0), 0);
  return chartData.map(x => ({
    _id: x._id,
    count: x._id === 'outside_range' ? outsideCount : (compareById.get(String(x._id)) ?? 0),
  }));
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
