import PageHeader from "@components/PageHeader"
import DateOfBirth from "@/components/DateOfBirth"

import { usePatientQuery, UseQueryResult, useDeletePatientMutation } from "@/queries"
import { useParams, useNavigate } from "@/router" 
import { Patient } from '@/types'
import { Link } from "react-router-dom"

function PatientInformation({patient}: {patient: Patient | undefined}) {
  if (patient) {
    return (
      <dl className="grid grid-cols-[20%,80%]">
        <dt>Name</dt>
        <dd>{patient.title} {patient.first_name}, {patient.last_name}</dd>
        <dt>Gender</dt>
        <dd>{patient.gender}</dd>
        <dt>Date Of birth</dt>
        <dd><DateOfBirth date={patient.date_of_birth}/></dd>
        <dt>Email</dt>
        <dd><a href={`mailto:${patient.email}`}>{ patient.email }</a></dd>
        <dt>Phone Number</dt>
        <dd><a href={`tel:${patient.phone}`}>{ patient.phone }</a></dd>
      </dl>
    )
  } else {
    return <div>Loading patient data...'</div>
  }
}

function PatientShow() {
  const { patient_id } = useParams();

  // We should never end up here, as we only route to this component when the parameter
  // is present. However typescript doesn't know this.
  if (!patient_id) { return <>No patient ID provided</> }

  const result = usePatientQuery(patient_id)
  const navigate = useNavigate()
  const deletePatient = useDeletePatientMutation({onSuccess: ()=> navigate('/patients')})

  const patient = result.data

  if (!patient) { return <PageHeader title="Patient" subtitle="Loading..."></PageHeader> }

  return(
    <>
      <PageHeader title="Patient"></PageHeader>
      <PatientInformation patient={patient}></PatientInformation>

      <Link 
        to={`/patients/${patient.id}/edit`}
        className="rounded-full bg-accent-800 p-3 text-white font-semibold block text-center my-3"
      >Edit Patient</Link>
      <a 
        onClick={() => deletePatient.mutate(patient_id) }
        className="rounded-full bg-red-800 p-3 text-white font-semibold block text-center my-3"
      >Remove Patient</a>
    </>
  )
}

export default PatientShow
