const fetch = require('node-fetch');

async function getSecretFiles() {
  const options = {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer aSuperSecretKey"
    },
  }

  const response = await (await fetch("https://echo-serv.tbxnet.com/v1/secret/files", options)).text()

  const data = JSON.parse(response)

  return data
}

async function downloadSecretFile(file) {
  try {
    const options = {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer aSuperSecretKey"
      },
  }

  const response = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, options)

  if (response.status !== 200) {
    console.log("error")
  }
  
  const data = await response.text();
  return data
} catch (error) {
  console.log("error", error)
}
}

function isValidHexadecimal32(hexString) {
  // Expresión regular para verificar un hexadecimal de exactamente 32 dígitos
  const hexRegex = /^[0-9A-Fa-f]{32}$/;
  return hexRegex.test(hexString);
}

function isValidNumber(value) {
    // Intenta convertir el valor a un número
    const number = Number(value);
    // Verifica si es un número y si no es NaN
    return !isNaN(number) && isFinite(number);
}

function isValidCSVFileName(fileName) {
    // Verifica si el nombre del archivo termina con '.csv'
    return fileName.trim().endsWith('.csv');
}

function isValidText(text) {
    return text.trim().length > 0;
}

async function formatFiles(files) {
  let allData = [];
  for (let index = 0; index < files.length; index += 1) {
    const element = await downloadSecretFile(files[index])
      if (!element) {
        console.error(`Error downloading file: ${files[index]}`);
        continue; // Saltar a la siguiente iteración si hay un error
      }
      const data = csvToObject(element);
      const validate = validateFields(data);
      const dataParse = parseData(validate);
      allData = allData.concat(dataParse); // Acumular los datos
  }

  return allData
}

function csvToObject(csv) {
  const lines = csv.split('\n'); // Dividir por líneas
  const headers = lines[0].split(','); // Obtener los encabezados
  const result = [];

  for (let i = 1; i < lines.length; i += 1) {
    const obj = {};
    const currentLine = lines[i].split(',');
    if (currentLine.length === headers.length) { // Asegurarse de que las longitudes coincidan
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim(); // Asignar valores al objeto
      }
        result.push(obj); // Agregar el objeto al resultado
    }
  }

  return result;
}

function parseData(array) {
  const data = array.reduce((acc, item) => {
    let existingFile = acc.find(file => file.file === item.file)

    if (!existingFile) {
      existingFile = { file: item.file, lines: []}
      acc.push(existingFile);
    }
    
    existingFile.lines.push({
      text: item.text,
      number: parseInt(item.number, 10),
      hex: item.hex
    })

    return acc
  }, [])

  return data;
}

function validateFields(fields){
  return fields.filter((field) => {
    if (!isValidNumber(field.number)) return false
    if (!isValidCSVFileName(field.file)) return false
    if (!isValidHexadecimal32(field.hex)) return false
    if (!isValidText(field.text)) return false
    return true
  })
}

module.exports = { formatFiles, getSecretFiles }