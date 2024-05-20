import PageHeader from "@components/PageHeader"
import { usePatientsQuery } from "@/queries"

function PatientIndex() {

  const result = usePatientsQuery()

  return <main>
    <PageHeader title="All Patients"></PageHeader>
    { result.isPending && <div>Pending</div> }
    { result.isFetching && <div>Refreshing</div> }
    { result.isError && <div>Calamity</div>}
    </main>
}

export default PatientIndex
