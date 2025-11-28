import React, { useState, useEffect } from 'react';
import { X, Loader2, Search, AlertCircle } from 'lucide-react';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxBodU-gX5_PMP8aDAATKl1-k_O3NKwyGFuzjfLXv0uBiX8-2xCDPdakRF-bYepE_arkG-4Jdjf4Ad/pub?gid=1782468016&single=true&output=csv";

// Kolom yang ingin ditampilkan (sesuai request)
const DISPLAY_COLUMNS = ['KD_PORSI', 'NAMA', 'KATEGORI', 'LUNAS', 'PASPOR', 'BIOVISA'];

const DataModal: React.FC<DataModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Simple CSV Parser handling quotes
  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };

    // Function to split line by comma respecting quotes
    const splitLine = (line: string) => {
      const result = [];
      let current = '';
      let inQuote = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const parsedHeaders = splitLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim()); // Remove surrounding quotes & trim
    const parsedRows = lines.slice(1).map(line => 
      splitLine(line).map(cell => cell.replace(/^"|"$/g, '').trim())
    );

    return { headers: parsedHeaders, rows: parsedRows };
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchData();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error('Gagal mengambil data');
      const text = await response.text();
      
      // Parse raw CSV
      const { headers: rawHeaders, rows: rawRows } = parseCSV(text);

      // --- FILTERING LOGIC ---
      
      // 1. Find indices of requested columns in the raw CSV
      const columnIndices = DISPLAY_COLUMNS.map(targetCol => 
        rawHeaders.findIndex(h => h.toUpperCase() === targetCol.toUpperCase())
      );

      // 2. Filter headers (Use the Display Columns list as the new header)
      // We only keep columns that actually exist in the CSV to avoid empty columns if CSV changes
      const validIndices = columnIndices.map((idx, i) => ({ idx, name: DISPLAY_COLUMNS[i] })).filter(item => item.idx !== -1);
      
      const finalHeaders = validIndices.map(item => item.name);
      
      // 3. Map rows to match the new column order
      const finalRows = rawRows.map(row => 
        validIndices.map(item => row[item.idx] || '-') // Use '-' if data is missing
      );

      setHeaders(finalHeaders);
      setData(finalRows);

    } catch (err) {
      setError('Terjadi kesalahan saat memuat data jemaah. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = data.filter(row => 
    row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gold-500/20">
        
        {/* Header */}
        <div className="p-6 bg-black-900 border-b border-gold-600 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white">Database Jemaah Haji 2026</h3>
            <p className="text-gold-500 text-sm">Update Berkala via Google Sheets</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Nama / No. Porsi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
            />
          </div>
          <div className="text-sm text-gray-500">
            Total Data: <span className="font-bold text-black-900">{filteredData.length}</span> Jemaah
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-white relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 z-10">
              <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
              <p className="text-gray-500 font-medium">Mengambil data terbaru...</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-red-500 font-medium">{error}</p>
              <button 
                onClick={fetchData}
                className="px-6 py-2 bg-black-900 text-white rounded-full hover:bg-gold-500 hover:text-black-900 transition-colors text-sm font-bold"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg m-4 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-16 bg-gray-100">
                        No
                      </th>
                      {headers.map((header, idx) => (
                        <th key={idx} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap bg-gray-100">
                          {header.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-gold-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-medium">
                            {rowIdx + 1}
                          </td>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {/* Status Badges for specific columns */}
                              {headers[cellIdx] === 'LUNAS' || headers[cellIdx] === 'PASPOR' || headers[cellIdx] === 'BIOVISA' ? (
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  cell.toLowerCase() === 'sudah' ? 'bg-green-100 text-green-800' : 
                                  cell.toLowerCase() === 'belum' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {cell}
                                </span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={headers.length + 1} className="px-6 py-12 text-center text-gray-500">
                          Data tidak ditemukan untuk pencarian "{searchTerm}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 shrink-0 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
           >
             Tutup
           </button>
        </div>
      </div>
    </div>
  );
};

export default DataModal;