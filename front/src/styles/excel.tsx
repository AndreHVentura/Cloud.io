import * as XLSX from 'xlsx';

const exportToExcel = () => {
    const ws = XLSX.utils.table_to_sheet(document.getElementById('tabela') as HTMLTableElement);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tabela de dados');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_meterologicos.xlsx'; // Nome do arquivo

    link.click(); // Dispara o download
    window.URL.revokeObjectURL(url); // Libera o objeto URL após o uso
  };

export default exportToExcel