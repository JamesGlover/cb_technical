import PageHeader from "@components/PageHeader"
import ErrorMessage from "@components/ErrorMessage"

import { usePatientQuery, useUpdatePatientMutation } from "@/queries"
import { useParams, useNavigate } from "@/router" 
import { useState } from 'react';
import { Patient, PatientErrors, PatientKeys, PartialPatient } from "@/types";

function FormFields({label, def, attribute, onChange, type="text", errors}: {
  label:string, 
  def: Patient,
  attribute: PatientKeys, 
  onChange: (patient: PartialPatient)=>void ,
  type?: string, 
  errors: PatientErrors
}) {
  const error_message = errors[attribute]

  const color = error_message ? 'red-500' : 'accent-300'

  return (<>
    <label htmlFor="title">{label}</label>
    <div>
      <input id="title" 
           defaultValue={def[attribute]} 
           onChange={(e)=> onChange({[attribute]: e.target?.value})} 
           type={type} 
           className={`border-2 border-${color} m-2 p-2 rounded w-full`}
      ></input>
      <span className="p-2 m-2 text-red-500">{ error_message }</span>
    </div>
    </>)
}

function PatientForm({def, onChange, formErrors}: {def: Patient, onChange: (patient: PartialPatient) => void, formErrors: { } }) {

  return (
    <form>
      <div className="grid grid-cols-[10%,70%]">
        <FormFields label="Title" def={def} attribute="title" onChange={onChange} errors={formErrors}/>
        <FormFields label="First Name" def={def} attribute="first_name" onChange={onChange} errors={formErrors}/>
        <FormFields label="Last Name" def={def} attribute="last_name" onChange={onChange} errors={formErrors}/>
        <FormFields label="Date of Birth" def={def} attribute="date_of_birth" onChange={onChange} errors={formErrors}/>
        <FormFields label="Gender" def={def} attribute="gender" onChange={onChange} errors={formErrors}/>
        <FormFields label="Email" def={def} attribute="email" onChange={onChange} type="email" errors={formErrors}/>
        <FormFields label="Phone" def={def} attribute="phone" onChange={onChange} type="tel" errors={formErrors}/>
      </div>
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
  const [errors, setErrors] = useState({message: null, details: {}})
  const updatePatient = useUpdatePatientMutation({onSuccess: () => navigate(show_page), onError: setErrors })

  if (!patient) { return <PageHeader title="Patient" subtitle="Loading..."></PageHeader> }

  const onChange = (new_state: PartialPatient) => setPatient({...patient, ...new_state})

  return(
    <>
      <PageHeader title="Patient" subtitle="Edit"></PageHeader>
      <ErrorMessage message={errors.message}></ErrorMessage>
      <PatientForm def={patient} onChange={onChange} formErrors={errors.details}></PatientForm>

      <button 
        onClick={(e)=>{ updatePatient.mutate({...patientState, id: patient_id})}}
        className="rounded-full bg-accent-800 p-3 text-white font-semibold block text-center my-3 w-full"
      >Save Changes To Patient</button>
    </>
  )
}

export default PatientEdit
