import PageHeader from "@components/PageHeader"
import { usePatientsQuery, UseQueryResult } from "@/queries"
import PatientsTable from "@components/PatientsTable"
import { Link } from "react-router-dom"

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

    <Link 
      to="/patients/new"
      className="rounded-full bg-accent-800 p-3 text-white font-semibold text-center my-3 absolute top-9 right-3"
    >Register New Patient</Link>
    { result.isError && <div>{ result.error.message }</div>}
    { result.isSuccess && <PatientsTable patients={result.data}></PatientsTable> }
    </>
}

export default PatientIndex
