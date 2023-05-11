// Implementation code where T is the returned data shape
export function api<T>(url: string): Promise<T> {
  return fetch(url, {mode: 'no-cors'})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      
      return response.json()
    })

}

// Consumer
// api<{ title: string; message: string }>('v1/posts/1')
//   .then(({ title, message }) => {
//     console.log(title, message)
//   })
//   .catch(error => {
//     /* show error message */
//   })