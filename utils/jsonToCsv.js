const jsonToCsv = ({ allItems, userId }) => {
  // console.log(allItems, "allItems", allItems.length);
  const allUserIds = allItems.map((item) => item.user._id.valueOf());
  const allLines = allItems.map((item, index) => item.result);
  // console.log(allUserIds, allLines);
  let test = "";
  let allLinesResult = [];
  allLines.map((line, lineIndex) => {
    test = Object.entries(line).map((value, index) => {
      return {
        [`${value[1].id}`]: value[1].response || "",
      };
    });
    // console.log(Object.assign(...test));
    allLinesResult = [
      ...allLinesResult,
      { userId: allUserIds[lineIndex], ...Object.assign(...test) },
    ];
  });
  const header = Object.keys(allLinesResult[0]);
  const headerString = header.join(",");
  // console.log(header);
  // handle null or undefined values here
  const replacer = (key, value) => value ?? "";
  const rowItems = allLinesResult.map((row) =>
    header
      .map((fieldName) => {
        // console.log("jesuisici", row[fieldName], typeof row[fieldName]);
        if (typeof row[fieldName] === "object") {
          let valueToReturn = Object.entries(row[fieldName]).map(
            (value) => value[1]
          );
          return JSON.stringify(valueToReturn.join(" "), replacer);
        }
        if (
          row[fieldName] === "" ||
          row[fieldName] === null ||
          row[fieldName] === undefined
        ) {
          return JSON.stringify(" ");
        }
        return JSON.stringify(row[fieldName], replacer);
      })
      .join(",")
  );
  const csv = [headerString, ...rowItems].join("\r\n");
  // console.log(rowItems);
  // let headerMaster = ["user_id"];
  // let subHeader = [" "];
  // let lineItem = [userId];
  // Object.entries(cleanItems).map((element) => {
  //   if (typeof element[1] === "object") {
  //     headerMaster = [
  //       ...headerMaster,
  //       element[0],
  //       Array(Object.keys(element[1]).length - 1).fill(" "),
  //     ].flat();
  //     subHeader = [...subHeader, Object.keys(element[1])].flat();
  //     lineItem = [...lineItem, Object.values(element[1])].flat();
  //   } else {
  //     headerMaster = [...headerMaster, element[0]];
  //     subHeader = [...subHeader, " "];
  //     lineItem = [...lineItem, element[1]];
  //   }
  // });
  // const replacer = (key, value) => value ?? "";
  // const headerMasterString = headerMaster.join(",");
  // const subHeaderString = subHeader
  //   .map((subheader) => JSON.stringify(subheader, replacer))
  //   .join(",");
  // const lineItemString = lineItem
  //   .map((line) => JSON.stringify(line, replacer))
  //   .join(",");
  // const csv = [headerMasterString, subHeaderString, lineItemString].join(
  //   "\r\n"
  // );
  // //   console.log(csv);
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
