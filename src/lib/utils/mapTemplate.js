const findId = (id, arr) => {
  return arr.findIndex((c) => c.id == id);
};

/* 
 * CAUTION: this function is _NOT_ recursive. cannot deal with 2 levels of children
 * @param {Object} templateTree
 * @param {number} tmpId - the HTML ID of latest component in structure
 */
export function mapTemplateToComponents(templateTree, tmpId) {
  var _tmpId = tmpId;
  let mappedArray = templateTree;
  mappedArray.forEach((c, i) => {
    if (c.children) {
      if (c.id.length > 3) {
        let prependedId = String(_tmpId);
        _tmpId++;
        mappedArray[i].id = prependedId;
      }

      c.children.map((child, childId) => {
        console.log(child);
        let idInArray = findId(child, mappedArray);

        let newId = String(_tmpId);
        _tmpId++;
        mappedArray[idInArray].id = newId;
        mappedArray[i].children[childId] = newId;
      });
    }
  });
  return mappedArray;
}
