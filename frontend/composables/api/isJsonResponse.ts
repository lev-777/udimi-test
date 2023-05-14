function isJsonResponse(response: Response): string|null|boolean {
  const type: string|null = response.headers.get('content-type')
  return type && type.includes('application/json')
}

export default isJsonResponse
