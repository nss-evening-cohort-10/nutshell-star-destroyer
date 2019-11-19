import $ from 'jquery';

const printToDom = (divId, textToPrint) => {
  const selectedDiv = $(`${divId}`);
  selectedDiv.html(textToPrint);
  console.log(selectedDiv[0]);
};

export default { printToDom };
