function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFormValues(formElements) {
  let data = {};
  for (var i = 0; i < formElements.length; i++) {
    const param = formElements[i].name;
    const val = formElements[i].value;
    if (val) {
      Object.assign(data, { [param]: val });
    }
  }
  return data;
}

export { sleep, getFormValues };
