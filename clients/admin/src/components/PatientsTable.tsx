import { Patient } from '@/types'
import { useNavigate } from '@/router'
import DateOfBirth from "@/components/DateOfBirth"

function patientRow(patient: Patient) {
  const navigate = useNavigate();

  return(
    <tr key={patient.id} className="even:bg-slate-100 hover:bg-accent-200 hover:cursor-pointer" onClick={() =>navigate(`/patients/${patient.id}`)}>
      <td>{ patient.title }</td>
      <td>{ patient.last_name }, { patient.first_name }</td>
      <td><DateOfBirth date={patient.date_of_birth} /></td>
    </tr>
  )
}

function patientRows(patients: Array<Patient>) {
  return patients.map(patientRow)
}

function PatientsTable({patients} : { patients: Array<Patient>}) {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr className="border-slate-800 border-b text-left">
          <th>Title</th>
          <th>Name</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        { patientRows(patients) }
      </tbody>
    </table>
  )
}

export default PatientsTable
