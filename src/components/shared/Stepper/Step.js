import React from "react";

const Step = ({ id, children, ...otherProps }) => (
  <div id={id} {...otherProps}>
    {children}
  </div>
);

Step.displayName = "Step";

export default Step;
