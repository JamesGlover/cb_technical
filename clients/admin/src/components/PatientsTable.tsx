import { Patient } from '@/types'

function DateOfBirth({date} : {date: string}) {
  Date.parse(date)
  const human_readable = new Date(date).toLocaleDateString()
  return <time dateTime={date}>{human_readable}</time>
}

function patientRow(patient: Patient) {
  return(
    <tr key={patient.id} className="even:bg-slate-100">
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
