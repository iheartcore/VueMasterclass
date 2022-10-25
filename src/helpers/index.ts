export const findById = ({
  resources,
  id,
}: {
  resources: Array
  id: string
}) => {
  if (!resources) {
    return null
  }

  return resources.find((resource) => resource.id === id)
}

export const upsert = ({
  resources,
  newResource,
}: {
  resources: Array<any>
  newResource: any
}) => {
  const index = resources.findIndex(
    (resource) => resource.id === newResource.id
  )
  if (newResource.id && index !== -1) {
    resources[index] = newResource
  } else {
    resources.push(newResource)
  }
}

export const addIfNotExists = (resource, id) => {
  if (!resource.includes(id)) {
    resource.push(id)
  }
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') {
    return doc
  }

  return {
    ...doc.data(),
    id: doc.id,
  }
}
