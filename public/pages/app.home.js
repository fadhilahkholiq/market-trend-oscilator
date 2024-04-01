defaultURL = `/api/signal?page=${defaultPage}&query=&direction=&algorithm=`
defaultColumns = [
  {
    render: (data, type, row) => {
      return `<img src="${row.thumbnail}" class="rounded-circle" width="25" height="25" alt="${row.symbol}">&nbsp;&nbsp;${row.symbol}`
    }
  },
  {
    data: 'price', className: 'text-center',
    render: (data) => `$${data}`
  },
  {
    data: 'direction', className: 'text-center',
    render: (data) => {
      return (
        data === 'bullish' ? '<span class="badge text-bg-success">↑ BULLISH</span>' :
        data === 'bearish' ? '<span class="badge text-bg-danger">↓ BEARISH</span>' : '-'
      )
    }
  },
  {
    className: 'text-center',
    render: (data, type, row) => {
      if (row.algorithm === 'correlation') {
        return `<span class="badge text-bg-dark">⚡ ${parseFloat(row.correlation).toFixed(2)}%</span>`
      } else {
        return `<span class="badge text-bg-dark">⚡ ${parseFloat(row.forecast).toFixed(2)}%</span>`
      }
    }
  },
  {
    data: 'algorithm', className: 'text-center',
    render: (data) => {
      return (
        data === 'correlation' ? '<span class="badge text-bg-dark">🔥 Correlation</span>' :
        data === 'forecast' ? '<span class="badge text-bg-dark">🔮 Forecast</span>' : '-'
      )
    }
  },
  {
    data: 'timestamp', className: 'text-center',
    render: (data) => moment(data).format('LL HH:mm:ssZ')
  },
  {
    data: 'profit', className: 'text-center',
    render: (data) => {
      const pnl = parseFloat(data || 0).toFixed(2)
      return (pnl > 0) ? `<span class="badge text-bg-success">+${pnl}%</span>` : `<span class="badge text-bg-danger">${pnl}%</span>`
    }
  },
  {
    data: 'symbol', className: 'text-center',
    render: (data) => {
      return `<a class="badge text-bg-primary" href="https://www.tradingview.com/chart/?symbol=BINANCE:${data.replace('/', '')}.P" target="_blank">+ View Chart</a>`
    }
  }
]

$(document).ready(function () {
  tableDataInit(defaultURL)
})