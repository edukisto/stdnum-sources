import { ISBN } from './isbn.js';

const isbn = new ISBN();
console.log(isbn.split());
console.log(isbn.validate());

// try {
//   // const x = split('978-90-70002-34-3');
//   // const x = split('9789070002343');

//   // 978-0-393-04002-9
//   const x = split('9780393040029');
//   console.log(x);
// }
// catch (event) {
//   console.log(event);
// }
