import PageHeader from "@components/PageHeader"
import ErrorMessage from "@components/ErrorMessage"
import PatientForm from "@components/PatientForm"

import { useCreatePatientMutation } from "@/queries"
import { useParams, useNavigate } from "@/router" 
import { useState } from 'react';
import { PartialPatient } from "@/types";


function PatientNew() {

  const navigate = useNavigate()

  const [patientState, setPatient] = useState({})
  const [errors, setErrors] = useState({message: null, details: {}})
  const updatePatient = useCreatePatientMutation({onSuccess: ({id}) => navigate(`/patients/${id}`), onError: setErrors })

  const onChange = (new_state: PartialPatient) => setPatient({...patientState, ...new_state})
  const defaults = {}
  
  return(
    <>
      <PageHeader title="Patient" subtitle="New"></PageHeader>
      <ErrorMessage message={errors.message}></ErrorMessage>
      <PatientForm def={defaults} onChange={onChange} formErrors={errors.details}></PatientForm>

      <button 
        onClick={(e)=>{ updatePatient.mutate(patientState) }}
        className="rounded-full bg-accent-800 p-3 text-white font-semibold block text-center my-3 w-full"
      >Register Patient</button>
    </>
  )
}

export default PatientNew
