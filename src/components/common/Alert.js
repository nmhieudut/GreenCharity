import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function CustomAlert({ label, ...rest }) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <Alert {...rest}>
          <AlertIcon />
          <AlertDescription>{label}</AlertDescription>
          <CloseButton
            onClick={() => setVisible(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
    </>
  );
}
