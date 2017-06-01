export function filterArticleInfo (article) {
  const sections = marked(article.body).split(/<!--\s*\w+\s*-->/g)
  return {
    id: article.id,
    number: article.number,
    title: article.title,
    createdAt: article.created_at.split('T')[0],
    quote: sections[0].trim(),
    body: sections[1].trim(),
    labels: article.labels
  }
}
