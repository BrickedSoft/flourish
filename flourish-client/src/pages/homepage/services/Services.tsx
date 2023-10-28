import { Box, Grid, GridItem } from "@chakra-ui/react";

import { servicesData } from "../../../assets/data/homepage/services";
import ServicesImage from "../../../assets/svg/Services";
import Container from "../../../components/common/Container";
import WidgetServicesWorks from "./WidgetServicesWorks";
import CustomHeading from "../../../components/common/CustomHeading";
import { HeadingVariant } from "../../../types/Enums";

const Services = () => {
  const renderedServiceWidget = servicesData.services.map((item, index) => {
    return (
      <GridItem key={index}>
        <WidgetServicesWorks
          data={item}
          isBoxShadow={true}
          alignItems="center"
        />
      </GridItem>
    );
  });

  return (
    <Container id="services" py={64}>
      <CustomHeading variant={HeadingVariant.primary}>
        {servicesData.title}
      </CustomHeading>
      <CustomHeading variant={HeadingVariant.secondary}>
        {servicesData.description}
      </CustomHeading>
      <Grid templateColumns="4fr 3fr" alignItems="center">
        <Grid templateColumns={"repeat(2, 1fr)"} columnGap={16} rowGap={32}>
          {renderedServiceWidget}
        </Grid>

        <GridItem>
          <Box boxSize={"110%"}>
            <ServicesImage />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Services;
