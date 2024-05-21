import PageHeader from "@components/PageHeader"
import { usePatientsQuery, UseQueryResult } from "@/queries"
import PatientsTable from "@components/PatientsTable"

function subtitleFor(result: UseQueryResult) {
  if (result.isPending) {
    return "Loading..."
  } else if (result.isFetching) {
    return "Updating..."
  }
}

function PatientIndex() {

  const result = usePatientsQuery()

  const subtitle = subtitleFor(result)

  return <>
    <PageHeader title="All Patients" subtitle={subtitle}></PageHeader>
    { result.isError && <div>{ result.error.message }</div>}
    { result.isSuccess && <PatientsTable patients={result.data}></PatientsTable> }
    </>
}

export default PatientIndex
