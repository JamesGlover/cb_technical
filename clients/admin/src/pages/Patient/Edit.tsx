import PageHeader from "@components/PageHeader"

import { usePatientQuery, UseQueryResult, useUpdatePatientMutation } from "@/queries"
import { useParams, useNavigate } from "@/router" 
import { Link } from "react-router-dom"
import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Patient } from "@/types";

const defaultPatient = {
  title: undefined,
  first_name: undefined,
  last_name: undefined,
  date_of_birth: undefined,
  gender: undefined,
  email: undefined,
  phone: undefined
}


function PatientForm({def, patient, setPatient}: {def: Patient, patient: Patient, setPatient: Dispatch<SetStateAction<Patient>>}) {

  const bindTo = (attribute: string) => (e: ChangeEvent<HTMLInputElement>) => setPatient({...patient, [attribute]: e.target?.value})

  return (
    <form>
      <dl className="grid grid-cols-[20%,80%]">
        <dt><label htmlFor="title">Title</label></dt>
        <dd><input id="title" defaultValue={def.title} onChange={bindTo('title')}></input></dd>
        <dt><label htmlFor="first_name">First Name</label></dt>
        <dd><input id="first_name" defaultValue={def.first_name} onChange={bindTo('first_name')}></input></dd>
        <dt><label htmlFor="last_name">Last Name</label></dt>
        <dd><input id="last_name" defaultValue={def.last_name} onChange={bindTo('last_name')}></input></dd>
        <dt><label htmlFor="date_of_birth">Date of Birth</label></dt>
        <dd><input id="date_of_birth" defaultValue={def.date_of_birth} onChange={bindTo('date_of_birth')}></input></dd>
        <dt><label htmlFor="gender">Gender</label></dt>
        <dd><input id="gender" defaultValue={def.gender} onChange={bindTo('gender')}></input></dd>
        <dt><label htmlFor="email">Email</label></dt>
        <dd><input id="email" defaultValue={def.email} type="email" onChange={bindTo('email')}></input></dd>
        <dt><label htmlFor="phone">Phone</label></dt>
        <dd><input id="phone" defaultValue={def.phone} type="tel" onChange={bindTo('phone')}></input></dd>
      </dl>
    </form>
  )
}

function PatientEdit() {
  const { patient_id } = useParams();

  // We should never end up here, as we only route to this component when the parameter
  // is present. However typescript doesn't know this.
  if (!patient_id) { return <>No patient ID provided</> }

  const result = usePatientQuery(patient_id)
  const navigate = useNavigate()
  const show_page = `/patients/${patient_id}`

  const patient = result.data || {}
  const [patientState, setPatient] = useState(patient)
  const updatePatient = useUpdatePatientMutation({onSuccess: () => navigate(show_page)})

  if (!patient) { return <PageHeader title="Patient" subtitle="Loading..."></PageHeader> }

  return(
    <>
      <PageHeader title="Patient" subtitle="Edit"></PageHeader>
      <PatientForm def={patient} patient={patientState} setPatient={setPatient}></PatientForm>

      <button 
        onClick={(e)=>{ updatePatient.mutate({...patientState, id: patient_id})}}
        className="rounded-full bg-accent-800 p-3 text-white font-semibold block text-center my-3 w-full"
      >Save Changes To Patient</button>
    </>
  )
}

export default PatientEdit
