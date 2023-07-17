/**
 * Remove all dangling or unnecessary string values.
 * @param content String 
 */
export function trimSpace(content: string | undefined): string | undefined {
  return (content) ?
    content.replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, "").trim() :
    undefined
}
