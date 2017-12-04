/* eslint-disable */
function isFailed(response) {
  if (response.data.errors) {
    console.warn('response.data.errors is has at least one error', response.data)
    return true
  }

  if (!response.data.success) {
    console.warn('response.data.success is false', response.data)
    return true
  }

  return false;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export { isFailed, deepClone }