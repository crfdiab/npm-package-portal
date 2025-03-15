
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '@/lib/utils';
import { DataTable } from '@/components/ui/data-table';
import { fetchPackages, PackageInfo } from '@/services/api';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PAGE_SIZE = 100;

const PackageTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      try {
        const { packages: pkgs, totalPages: pages } = await fetchPackages(currentPage, PAGE_SIZE);
        setPackages(pkgs);
        setTotalPages(pages);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (packageName: string, version: string) => {
    navigate(`/package-detail/${packageName}-${version}`);
  };

  const columnHelper = createColumnHelper<PackageInfo>();

  const columns: ColumnDef<PackageInfo, any>[] = [
    columnHelper.accessor('name', {
      header: 'Package Name',
      cell: ({ row }) => (
        <div 
          className="font-medium cursor-pointer hover:text-primary transition-colors flex items-center space-x-1"
          onClick={() => handleRowClick(row.original.name, row.original.version)}
        >
          <span>{row.original.name}</span>
          <ExternalLink className="h-3 w-3 opacity-50" />
        </div>
      ),
    }),
    columnHelper.accessor('version', {
      header: 'Latest Version',
      cell: ({ getValue }) => (
        <Badge variant="outline" className="font-mono text-xs">
          {getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('weeklyDownloads', {
      header: 'Weekly Downloads',
      cell: ({ getValue }) => formatNumber(getValue()),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="truncate max-w-md" title={getValue()}>
          {getValue()}
        </div>
      ),
    }),
  ];

  return (
    <div className={loading ? 'opacity-70 transition-opacity' : ''}>
      <DataTable
        columns={columns}
        data={packages}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PackageTable;
