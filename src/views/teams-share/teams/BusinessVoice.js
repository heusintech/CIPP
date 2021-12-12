import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CippDatatable from 'src/components/cipp/CippDatatable'
import CellBoolean from '../../../components/cipp/CellBoolean'
import TenantSelector from 'src/components/cipp/TenantSelector'

const Formatter = (cell) => CellBoolean({ cell })
const columns = [
  {
    name: 'Assigned to User',
    selector: 'AssignedTo',
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: 'TelephoneNumber',
    sortable: true,
  },
  {
    name: 'Number Type',
    selector: 'NumberType',
    sortable: true,
  },
  {
    name: 'Country',
    selector: 'IsoCountryCode',
    sortable: true,
  },
  {
    name: 'Location',
    selector: 'PlaceName',
    sortable: true,
  },
  {
    name: 'Activation State',
    selector: 'ActivationState',
    formatter: Formatter,
    sortable: true,
  },
  {
    name: 'Operator Connect',
    selector: 'IsOperatorConnect',
    formatter: Formatter,
    sortable: true,
  },
  {
    name: 'Purchased on',
    selector: 'AcquisitionDate',
    sortable: true,
  },
]

const BusinessVoice = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  return (
    <div>
      <TenantSelector />
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Teams Activity</h3>
        {Object.keys(tenant).length === 0 && <span> Select a tenant to get started.</span>}
        <CippDatatable
          reportName={`${tenant?.defaultDomainName}-Businessvoice`}
          path="/api/ListTeamsVoice"
          columns={columns}
          params={{ TenantFilter: tenant?.defaultDomainName }}
        />
      </div>
    </div>
  )
}

export default BusinessVoice