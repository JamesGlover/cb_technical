
import { PatientErrors, PatientKeys, PartialPatient } from "@/types";

function FormFields({label, def, attribute, onChange, type="text", errors}: {
  label:string, 
  def: PartialPatient,
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

function PatientForm({def, onChange, formErrors}: {def: PartialPatient, onChange: (patient: PartialPatient) => void, formErrors: { } }) {

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

export { PatientForm, FormFields }
export default PatientForm
