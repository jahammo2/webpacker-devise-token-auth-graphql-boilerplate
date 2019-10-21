export default function (formElements) {
  return Array.prototype.reduce.call(formElements, (accumulator, element) => {
    if (element.name && element.value) {
      accumulator[element.name] = element.value;
    }

    return accumulator;
  }, {});
}
