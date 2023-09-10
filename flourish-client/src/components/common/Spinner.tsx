import { Spinner as SpinnerComponent } from "@chakra-ui/react";

const Spinner = (props: any) => {
  return (
    <SpinnerComponent
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="primary.500"
      boxSize={"36px"}
      {...props}
    />
  );
};

export default Spinner;
