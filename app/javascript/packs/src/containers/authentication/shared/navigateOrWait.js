export default function (props, path = '/') {
  const { errors, history } = props;

  if (errors === null) return history.push(path);

  return null;
}
