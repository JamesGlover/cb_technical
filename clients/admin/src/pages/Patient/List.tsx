import PageHeader from "@components/PageHeader"
import { usePatientsQuery } from "@/queries"
import PatientsTable from "@components/PatientsTable"

function PatientIndex() {

  const result = usePatientsQuery()

  return <>
    <PageHeader title="All Patients"></PageHeader>
    { result.isPending && <div>Pending</div> }
    { result.isFetching && <div>Refreshing</div> }
    { result.isError && <div>Calamity</div>}
    { result.isSuccess && <PatientsTable patients={result.data}></PatientsTable> }
    </>
}

export default PatientIndex
