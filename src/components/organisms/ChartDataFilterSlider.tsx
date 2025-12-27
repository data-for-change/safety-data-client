import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { ItemCount } from '../../types';

interface IProps {
  id: string;
  data: ItemCount[];
}

const ChartDataFilterSlider: FC<IProps> = observer(({ id, data }) => {
  const { filterStore } = useStore();
  const { chartDataRanges, setChartDataRange } = filterStore;
  const { t } = useTranslation();
  const direction = useSelector((state: RootState) => state.appUi.direction);
  const isRtl = direction === 'rtl';

  // Calculate actual max value for the slider scale (Y-axis)
  const getItemValue = (item: any) => {
    if (item.count !== undefined) return Number(item.count);
    // For grouped data, find the maximum individual bar value among all groups
    const values = Object.keys(item)
      .filter(key => key !== '_id' && typeof item[key] === 'number')
      .map(key => Number(item[key]));
    return values.length > 0 ? Math.max(...values) : 0;
  };

  const maxVal = data?.reduce((max, item) => Math.max(max, getItemValue(item)), 0) || 100;
  const chartDataRange = chartDataRanges.get(id) || { start: 0, end: maxVal };

  // Local state for smooth dragging before updating store
  const [localRange, setLocalRange] = useState(chartDataRange);

  useEffect(() => {
    // Sync with store when data changes or maxVal updates
    if (data && data.length > 0) {
      if (chartDataRange.end > maxVal || chartDataRange.end === 0) {
        setChartDataRange(id, 0, maxVal);
        setLocalRange({ start: 0, end: maxVal });
      } else {
        setLocalRange(chartDataRange);
      }
    }
  }, [id, data, maxVal, chartDataRange.start, chartDataRange.end, setChartDataRange]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), localRange.end - 1);
    setLocalRange((prev: {start: number, end: number}) => ({ ...prev, start: val }));
    setChartDataRange(id, val, localRange.end);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), localRange.start + 1);
    setLocalRange((prev: {start: number, end: number}) => ({ ...prev, end: val }));
    setChartDataRange(id, localRange.start, val);
  };

  if (!data || data.length <= 1) return null;

  const leftPosStart = isRtl ? `${100 - (localRange.start / maxVal) * 100}%` : `${(localRange.start / maxVal) * 100}%`;
  const leftPosEnd = isRtl ? `${100 - (localRange.end / maxVal) * 100}%` : `${(localRange.end / maxVal) * 100}%`;

  return (
    <div className="chart-range-slider-container" style={styles.container}>
      <div style={styles.labelContainer}>
        <span style={styles.labelText}>
          {t('data_range')}: {localRange.start} - {localRange.end}
        </span>
      </div>
      <div style={styles.sliderWrapper}>
        <input
          type="range"
          min={0}
          max={maxVal}
          value={localRange.start}
          onChange={handleStartChange}
          style={{ ...styles.slider, ...styles.sliderStart }}
        />
        <input
          type="range"
          min={0}
          max={maxVal}
          value={localRange.end}
          onChange={handleEndChange}
          style={{ ...styles.slider, ...styles.sliderEnd }}
        />
        <div style={styles.track} />
        <div
          style={{
            ...styles.rangeHighlight,
            left: isRtl ? `${100 - (localRange.end / maxVal) * 100}%` : `${(localRange.start / maxVal) * 100}%`,
            right: isRtl ? `${(localRange.start / maxVal) * 100}%` : `${100 - (localRange.end / maxVal) * 100}%`
          }}
        />

        {/* Value labels below handles */}
        <div style={{ ...styles.thumbValue, left: leftPosStart, transform: 'translateX(-50%) translateY(20px)' }}>
          {localRange.start}
        </div>
        <div style={{ ...styles.thumbValue, left: leftPosEnd, transform: 'translateX(-50%) translateY(20px)' }}>
          {localRange.end}
        </div>

        {/* Endpoints */}
        <div style={{
          ...styles.thumbValue,
          left: isRtl ? '100%' : '0%',
          transform: `translateX(${isRtl ? '50%' : '-50%'}) translateY(20px)`
        }}>
          0
        </div>
        <div style={{
          ...styles.thumbValue,
          left: isRtl ? '0%' : '100%',
          transform: `translateX(${isRtl ? '-50%' : '50%'}) translateY(20px)`
        }}>
          {maxVal}
        </div>
      </div>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4px 12px 24px 12px',
    minWidth: '200px',
    flex: 1,
    margin: '0 10px',
  },
  labelContainer: {
    marginBottom: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  labelText: {
    whiteSpace: 'nowrap',
  },
  sliderWrapper: {
    position: 'relative',
    width: '100%',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  rangeHighlight: {
    position: 'absolute',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#3b82f6', // Premium blue
    zIndex: 2,
    boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    pointerEvents: 'none',
    appearance: 'none',
    height: '0',
    background: 'none',
    zIndex: 3,
    margin: 0,
  },
  sliderStart: {
    zIndex: 4,
  },
  sliderEnd: {
    zIndex: 3,
  },
  thumbValue: {
    position: 'absolute',
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#ff4b2b', // Red as requested in drawing
    zIndex: 5,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
};

// Add CSS for the thumb since we can't do it easily inline for all browsers
const css = `
  .chart-range-slider-container input[type=range]::-webkit-slider-thumb {
    pointer-events: auto;
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    margin-top: -6px;
  }
  .chart-range-slider-container input[type=range]::-moz-range-thumb {
    pointer-events: auto;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}

export default ChartDataFilterSlider;
