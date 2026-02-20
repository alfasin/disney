import { useLiveQuery } from '@electric-sql/pglite-react'

interface TableViewerProps {
  query: string
  title: string
}

export default function TableViewer({ query, title }: TableViewerProps) {
  const result = useLiveQuery(query)

  if (!result) return <div className="table-loading">Loading {title}...</div>

  const columns = result.fields.map((f) => f.name)

  return (
    <div className="table-viewer">
      <h3>
        {title}{' '}
        <span className="row-count">({result.rows.length} rows)</span>
      </h3>
      {result.rows.length === 0 ? (
        <p className="empty-table">No data yet</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col}>{formatValue(row[col])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return '—'
  if (val instanceof Date) return val.toLocaleString()
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  return String(val)
}
