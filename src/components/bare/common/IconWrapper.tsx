import { Dynamic } from "solid-js/web";

const CableIcon = (props) => {
  return <Dynamic component={props.icon} {...props} />;
};

export default CableIcon;
