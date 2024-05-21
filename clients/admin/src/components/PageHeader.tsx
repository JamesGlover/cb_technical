
function Subtitle({content}: { content?: string}) {
  if (content) {
    return <small>{content}</small>
  } else {
    return <></>
  }
}

function PageHeader({ title, subtitle }: {title: string, subtitle?: string}) {
  
  return (
    <header className="text-lg w-fit border-b-2 padding-3 my-3">
      <h2>{ title } <Subtitle content={subtitle}></Subtitle></h2>
    </header>
  )
}

export default PageHeader
