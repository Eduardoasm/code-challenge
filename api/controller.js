import { getSecretFiles, downloadSecretFile } from "./service.js";

export async function formatFiles(req, res) {
  const { files } = await getSecretFiles();

  let allData = [];
  for (let index = 0; index < files.length; index += 1) {
    const element = await downloadSecretFile(files[index])
      if (!element) {
        console.error(`Error downloading file: ${files[index]}`);
        continue; // Saltar a la siguiente iteración si hay un error
      }
      console.log("soy element", element);
      const data = csvToObject(element);
      allData = allData.concat(parseData(data)); // Acumular los datos
  }

  console.log("data", allData)

  return res.status(200).json(allData);
}

function csvToObject(csv) {
    const lines = csv.split('\n'); // Dividir por líneas
    console.log("lines", lines)
    const headers = lines[0].split(','); // Obtener los encabezados
    console.log("headers", headers)
    const result = [];

    for (let i = 1; i < lines.length; i += 1) {
        const obj = {};
        const currentLine = lines[i].split(',').filter((el) => el !== '');
        console.log("soy currentline", currentLine)
        if (currentLine.length === headers.length) { // Asegurarse de que las longitudes coincidan
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentLine[j].trim(); // Asignar valores al objeto
            }
            result.push(obj); // Agregar el objeto al resultado
        }
    }

    return result;
}

export function parseData(array) {
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