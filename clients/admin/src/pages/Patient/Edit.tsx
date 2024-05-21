import PageHeader from "@components/PageHeader"
import ErrorMessage from "@components/ErrorMessage"
import PatientForm from "@components/PatientForm"

import { usePatientQuery, useUpdatePatientMutation } from "@/queries"
import { useParams, useNavigate } from "@/router" 
import { useState } from 'react';
import { PartialPatient } from "@/types";


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

  const onChange = (new_state: PartialPatient) => setPatient({...patientState, ...new_state})

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
