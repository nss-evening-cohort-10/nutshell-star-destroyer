import $ from 'jquery';

const printToDom = (divId, textToPrint) => {
  const selectedDiv = $(`#${divId}`);
  selectedDiv.html(textToPrint);
};

export default { printToDom };
