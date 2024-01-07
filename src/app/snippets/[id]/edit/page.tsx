interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const id = parseInt(params.id);

  return <div>Editing snippet with id {id}</div>;
}
