import React, { ReactElement } from 'react';
import { useTable } from 'react-table';

interface Props {
  data: any;
  columns: any;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasMore: boolean;
  page: number;
  totalPages?: number;
  totalItems?: number;
}
//@ts-ignore
function Table({ columns, data, onNextPage, hasMore, onPrevPage, page, totalPages = 0 }: Props): ReactElement {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <>
      <table {...getTableProps()} style={{ border: 'solid 1px gray', width: '1200px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className='buttonsContainer'>
        <button onClick={onPrevPage} disabled={page <= 0}>
          {'<'}
        </button>
        {`  Page ${page + 1} of ${totalPages}  `}
        <button onClick={onNextPage} disabled={page + 1 >= totalPages}>
          {'>'}
        </button>
      </div>
    </>
  );
}

export default Table;
