export const findById = (resources, id) =>
  resources.find((resource) => resource.id === id)

export const upsert = (resources, newResource) => {
  const index = resources.findIndex(
    (resource) => resource.id === newResource.id
  )
  if (newResource.id && index !== -1) {
    resources[index] = newResource
  } else {
    resources.push(newResource)
  }
}
