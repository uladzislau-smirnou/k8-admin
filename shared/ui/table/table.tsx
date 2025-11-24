import type { TableProps } from './types';

export const Table = <D extends {}>({
  columns,
  data,
  emptyDataText,
  cellRenderer,
}: TableProps<D>) => {
  if (!data.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">{emptyDataText}</div>
      </div>
    );
  }

  return (
    <div className="w-full border border-(--table-border) rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-(--table-header-bg) min-w-full divide-y divide-(--table-border)">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-(--table-header-text) uppercase tracking-wider"
              >
                {column.columnHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={`p-4 bg-(--table-row-bg) divide-y divide-(--table-border)`}
        >
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={String(col.cellValueKey)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-table-row-text"
                >
                  {cellRenderer
                    ? cellRenderer({ row: item, column: col })
                    : String(item[col.cellValueKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
