import { Patient } from '@/types'

function DateOfBirth({date} : {date: string}) {
  Date.parse(date)
  const human_readable = new Date(date).toLocaleDateString()
  return <time dateTime={date}>{human_readable}</time>
}

function patientRow(patient: Patient) {
  return(
    <tr>
      <td>{ patient.title }</td>
      <td>{ patient.first_name }</td>
      <td>{ patient.last_name }</td>
      <td><DateOfBirth date={patient.date_of_birth} /></td>
    </tr>
  )
}

function patientRows(patients: Array<Patient>) {
  return patients.map(patientRow)
}

function PatientsTable({patients} : { patients: Array<Patient>}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Name</th>
          <th>First Name</th>
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
