import * as fs from "fs";

const mdFilePath = "./README.md";
const versionId = "version";
const newVersionNumber = "2.0.0";

fs.readFile(mdFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Find the HTML tag with the "version" ID
  const regex = new RegExp(`<[^>]*id="${versionId}"[^>]*>([^<]*)<`, "i");
  const match = data.match(regex);

  if (match && match.length > 1) {
    // Replace the version number with the new one
    const oldVersionNumber = match[1];
    const newHtmlTag = `<span id="${versionId}">${newVersionNumber}</span>`;
    const newData = data.replace(match[0], newHtmlTag);
    // Write the modified data back to the file
    fs.writeFile(mdFilePath, newData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `Successfully updated ${mdFilePath} with new version number ${newVersionNumber}`
      );
    });
  } else {
    console.error(
      `Could not find HTML tag with ID "${versionId}" in ${mdFilePath}`
    );
  }
});
