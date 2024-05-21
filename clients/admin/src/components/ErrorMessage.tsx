
function ErrorMessage({message}:{message?: string | null}) {
  if (!message) { return <></> }

  return (
    <div className="bg-red-400 text-slate-100 p-2 my-3 rounded border-2 border-red-600">
      { message }
    </div>
  )
}

export default ErrorMessage
