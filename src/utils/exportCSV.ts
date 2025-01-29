export  const exportCSV = (columns: any[], data: any[], fileName = 'saefty_data.csv') => {
    // Generate CSV content
    const headers = Object.keys(data[0]).join(',');
    // const headers = columns.map((col) => col.header).join(',');
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(',')
    );
    const csvContent = [headers, ...rows].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };