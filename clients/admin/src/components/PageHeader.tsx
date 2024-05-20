
function Subtitle({content}: { content: string | null}) {
  if (content) {
    return <small>{content}</small>
  } else {
    return <></>
  }
}

function PageHeader({ title, subtitle }: {title: string, subtitle: string | null}) {
  
  return (
    <header className="m-3 text-lg w-fit border-b-2 padding-2">
      <h2>{ title } <Subtitle content={subtitle}></Subtitle></h2>
    </header>
  )
}

export default PageHeader
