import React from 'react'
import { useSelector } from 'react-redux'
import TenantSelector from '../../../components/cipp/TenantSelector'
import CippDatatable from '../../../components/cipp/CippDatatable'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CellBoolean from '../../../components/cipp/CellBoolean'

const Formatter = (cell) => CellBoolean({ cell })
const dropdown = (row, index, column) => {
  return (
    <CDropdown>
      <CDropdownToggle color="primary">...</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#">Edit Group</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const columns = [
  {
    selector: 'displayName',
    name: 'Name',
    sortable: true,
  },
  {
    selector: 'Description',
    name: 'Description',
    sortable: true,
  },
  {
    selector: 'installProgressTimeoutInMinutes',
    name: 'Installation Timeout (Minutes)',
    sortable: true,
  },
  {
    selector: 'showInstallationProgress',
    name: 'Show Installation Progress',
    sortable: true,
    formatter: Formatter,
  },
  {
    selector: 'blockDeviceSetupRetryByUser',
    name: 'Block Retries',
    sortable: true,
    formatter: Formatter,
  },
  {
    selector: 'allowDeviceResetOnInstallFailure',
    name: 'Allow reset on failure',
    sortable: true,
    formatter: Formatter,
  },
  {
    selector: 'allowDeviceUseOnInstallFailure',
    name: 'Allow usage on failure',
    sortable: true,
    formatter: Formatter,
  },
  {
    name: 'Actions',
    cell: dropdown,
  },
]

const AutopilotListESP = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <div>
      <TenantSelector />
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Applications List</h3>
        {Object.keys(tenant).length === 0 && <span>Select a tenant to get started.</span>}
        <CippDatatable
          keyField="id"
          reportName={`${tenant?.defaultDomainName}-AutopilotProfile-List`}
          path="/api/ListAutopilotConfig?type=ESP"
          columns={columns}
          params={{ TenantFilter: tenant?.defaultDomainName }}
        />
      </div>
    </div>
  )
}

export default AutopilotListESP