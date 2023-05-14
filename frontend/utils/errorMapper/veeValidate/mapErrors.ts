export async function mapErrors(e: Response, fn: (field: string, message: string) => void): Promise<void> {
  const { first_errors } = await e.json()

  Object.keys(first_errors).forEach((field: string): void => {
    let errorMessage = null

    if (field === 'error') {
      field = 'name'
      errorMessage = first_errors['error']
    }

    fn(field, errorMessage || first_errors[field])
  })
}
