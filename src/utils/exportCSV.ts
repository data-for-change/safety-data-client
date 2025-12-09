export const exportCSV = (columns: any[], data: any[], fileName = 'saefty_data') => {
  if (!data || data.length === 0) return;
  // Generate headers from object keys or column definitions
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${val}"`)
      .join(',')
  );
  const csvContent = [headers, ...rows].join('\n');
  
  // UTF-8 BOM for correct encoding in tools like Excel
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Add timestamp to filename
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const fullFileName = `${fileName}_${timestamp}.csv`;

  // Trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fullFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
