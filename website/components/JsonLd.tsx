/** Server component: puts schema.org JSON-LD into the raw HTML. The '<' escape stops a stray </script> from breaking out of the tag. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
