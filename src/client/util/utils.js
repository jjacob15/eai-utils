export function getObjFromArr(arr, id, idProp = 'id') {
  if (checkIfObjExists(arr, id, idProp)) {
    const result = arr.find(x => x[idProp] === id);
    return result || null;
  }
  return null;
}

export function getObjIdxFromArr(arr, id, idProp = 'id') {
  if (checkIfObjExists(arr, id, idProp)) {
    return programs.map(x => x.id).indexOf(id);
  }
  return null;
}

function checkIfObjExists(arr, id, idProp) {
  if (id === -1 || id === null) return false;

  if (!arr) return false;

  if (arr.length === 0) return false;

  //check if id prop exists.
  if (!arr[0].hasOwnProperty(idProp)) return false;

  return true;
}
