let fetchDatatable = null
let defaultURL = null, defaultColumns = []
let dataFilterQuery = '', dataFilterId = '', dataFilterSymbol = '', dataFilterDirection = '', dataFilterAlgorithm = ''
let defaultPage = 1, currentPage = 1
$.fn.dataTable.ext.errMode = 'none'

function tableDataReload() {
  $('#datatable').DataTable().ajax.reload(null, false)
}

function tableDataDefault() {
  fetchDatatable = $('#datatable').DataTable({
    processing: true,
    responsive: true,
    autoWidth: false,
    dom: '',
    columns: defaultColumns,
    order: []
  })
}

function tableDataInit(url) {
  fetchDatatable = $('#datatable').DataTable({
    responsive: true,
    processing: true,
    autoWidth: false,
    dom: '',
    ajax: {
      url,
      dataSrc: 'data.data',
    },
    columns: defaultColumns,
    order: []
  })
  fetchDatatable.on('xhr', function () {
    const response = fetchDatatable.ajax.json()
    if (response.success) {
      const { data: { data: dataPage, pagination, pagination: { total, lastPage, perPage } } } = fetchDatatable.ajax.json()
      currentPage = Number(pagination.currentPage)
      $('#datatable_pagination').html(`
        <div class="col-6">
          <span>Page ${currentPage} (Showing ${dataPage.length} from ${total} record)</span>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <ul class="pagination pagination-rounded mb-0">
            <li class="page-item ${currentPage !== 1 ? '' : 'disabled'}">
              <a class="page-link" href="javascript:void(0)" aria-label="Previous" onclick="tablePagination(${(currentPage - 1) < 1 ? 1 : (currentPage - 1)})">
                <i class="mdi mdi-chevron-left"></i>
              </a>
            </li>
            ${tablePaginationGenerate(currentPage, lastPage, perPage).map(page => `
              <li class="page-item ${currentPage === page ? 'active' : ''}">
                <a class="page-link" href="javascript:void(0)" onclick="tablePagination(${page})">${page}</a>
              </li>
            `).join('')}
            <li class="page-item ${currentPage !== (lastPage === 0 ? 1 : lastPage) ? '' : 'disabled'}">
              <a class="page-link" href="javascript:void(0)" aria-label="Next" onclick="tablePagination(${currentPage + 1})">
                <i class="mdi mdi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      `)
    } else {
      toastr.error(response.message)
    }
  })
}

function tablePaginationGenerate(currentPage, lastPage) {
  let maxPagesToShow = 4, startRange, endRange
  if (lastPage <= maxPagesToShow) {
    startRange = 1, endRange = lastPage
  } else if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
    startRange = 1, endRange = maxPagesToShow
  } else if (currentPage >= lastPage - Math.floor(maxPagesToShow / 2)) {
    startRange = lastPage - maxPagesToShow + 1, endRange = lastPage
  } else {
    startRange = currentPage - Math.floor(maxPagesToShow / 2)
    endRange = currentPage + Math.floor(maxPagesToShow / 2)
  }
  return Array(endRange - startRange + 1).fill().map((_, i) => startRange + i)
}

function tablePagination(page) {
  defaultURL = defaultURL.replace(/(page)=([^&]+|)/gi, `page=${page}`)
  $('#datatable').DataTable().destroy()
  tableDataInit(defaultURL)
}

function tableFilterQuery(e) {
  dataFilterQuery = e.value
  defaultURL = defaultURL.replace(/(query)=([^&]+|)/gi, `query=${dataFilterQuery}`)
  $('#datatable').DataTable().destroy()
  tablePagination(defaultPage)
  tableDataInit(defaultURL)
}

function tableFilterId(e) {
  dataFilterId = e.target.value
  defaultURL = defaultURL.replace(/(id)=([^&]+|)/gi, `id=${dataFilterId}`)
  $('#datatable').DataTable().destroy()
  tablePagination(defaultPage)
  tableDataInit(defaultURL)
}

function tableFilterSymbol(e) {
  dataFilterSymbol = e.target.value
  defaultURL = defaultURL.replace(/(symbol)=([^&]+|)/gi, `symbol=${dataFilterSymbol}`)
  $('#datatable').DataTable().destroy()
  tablePagination(defaultPage)
  tableDataInit(defaultURL)
}

function tableFilterDirection(e) {
  dataFilterDirection = e.value
  defaultURL = defaultURL.replace(/(direction)=([^&]+|)/gi, `direction=${dataFilterDirection}`)
  $('#datatable').DataTable().destroy()
  tablePagination(defaultPage)
  tableDataInit(defaultURL)
}

function tableFilterAlgorithm(e) {
  dataFilterAlgorithm = e.value
  defaultURL = defaultURL.replace(/(algorithm)=([^&]+|)/gi, `algorithm=${dataFilterAlgorithm}`)
  $('#datatable').DataTable().destroy()
  tablePagination(defaultPage)
  tableDataInit(defaultURL)
}