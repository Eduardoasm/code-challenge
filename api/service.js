export async function getSecretFiles() {
  const options = {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer aSuperSecretKey"
    },
  }

  const response = await (await fetch("https://echo-serv.tbxnet.com/v1/secret/files", options)).text()
  console.log("soy response", response)
  const data = JSON.parse(response)

  return data
}

export async function downloadSecretFile(file) {
  try {
        
    const options = {
      method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer aSuperSecretKey"
    },
  }

  const response = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, options)
  console.log("response", response.status)

  if (response.status !== 200) {
    console.log("error")
  }
  
  const data = await response.text();
  console.log("so data", data)
  return data
} catch (error) {
  console.log("error", error)
}
}