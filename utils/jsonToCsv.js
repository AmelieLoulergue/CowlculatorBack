const jsonToCsv = ({ allItems, items, userId }) => {
  //   console.log(allItems);
  const allInformations = allItems.map((element) => {
    return {
      userId: element.user._id.toString(),
      response: element.response,
      result: element.result,
    };
  });
  const allResults = allItems.map((element) => element.result);
  console.log(allInformations, "coucou");
  let itemsToCSV = [];
  itemsToCSV = items
    .map((element) => [...itemsToCSV, { [`${element.id}`]: element.response }])
    .flat();
  const cleanItems = Object.assign({}, ...itemsToCSV);
  let headerMaster = ["user_id"];
  let subHeader = [" "];
  let lineItem = [userId];
  Object.entries(cleanItems).map((element) => {
    if (typeof element[1] === "object") {
      headerMaster = [
        ...headerMaster,
        element[0],
        Array(Object.keys(element[1]).length - 1).fill(" "),
      ].flat();
      subHeader = [...subHeader, Object.keys(element[1])].flat();
      lineItem = [...lineItem, Object.values(element[1])].flat();
    } else {
      headerMaster = [...headerMaster, element[0]];
      subHeader = [...subHeader, " "];
      lineItem = [...lineItem, element[1]];
    }
  });
  const replacer = (key, value) => value ?? "";
  const headerMasterString = headerMaster.join(",");
  const subHeaderString = subHeader
    .map((subheader) => JSON.stringify(subheader, replacer))
    .join(",");
  const lineItemString = lineItem
    .map((line) => JSON.stringify(line, replacer))
    .join(",");
  const csv = [headerMasterString, subHeaderString, lineItemString].join(
    "\r\n"
  );
  //   console.log(csv);
  return csv;
};

const cleanCsv = (csv) => {
  const csvClean = csv.split(",").map((element) => {
    if (element.includes('{"value":')) {
      return element.split('{"value":')[1];
    }
    if (element.includes('"unit":') && element.includes("}")) {
      return element.split('"unit":')[1].split("}")[0];
    }
    return element;
  });
  return csvClean.join(",");
};

module.exports = { jsonToCsv, cleanCsv };
