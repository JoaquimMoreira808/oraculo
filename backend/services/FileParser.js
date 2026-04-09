const XLSX = require('xlsx');

class FileParser {
  static parseFile(buffer, filename) {
    const ext = filename.toLowerCase().split('.').pop();
    
    if (ext === 'csv') {
      return this.parseCSV(buffer);
    } else if (ext === 'xlsx') {
      return this.parseXLSX(buffer);
    }
    
    throw new Error('Formato não suportado');
  }
  
  static parseCSV(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }
  
  static parseXLSX(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }
}

module.exports = FileParser;