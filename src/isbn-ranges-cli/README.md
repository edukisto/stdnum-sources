# ISBN ranges CLI

![node/v](https://img.shields.io/node/v/@stdnum/isbn-ranges-cli?label=Node.js&logo=nodedotjs)
![npm/v](https://img.shields.io/npm/v/@stdnum/isbn-ranges-cli?label=latest&logo=npm)

Converts the ISBN range message from XML to JSON.

See <https://www.isbn-international.org/range_file_generation> for details.

## Installation

```bash
npm i @stdnum/isbn-ranges-cli
```

## Usage

```bash
wget -O RangeMessage.xml https://www.isbn-international.org/export_rangemessage.xml
npx isbn-ranges-cli convert RangeMessage.xml isbn_ranges.json
```
