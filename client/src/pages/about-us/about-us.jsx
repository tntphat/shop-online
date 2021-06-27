import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Paper, Grid, Box, IconButton } from "@material-ui/core";
import useStyles from "./about-us.styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PhoneIcon from "@material-ui/icons/Phone";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";

export default function AboutUs() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.container}>
        <Grid item sm={1} xs={false} />
        <Grid container spacing={1} item sm={10} xs={12}>
          <Grid item sm={6} xs={12}>
            <div className={classes.image} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography className={classes.title} variant="h4" align="center">
              ABOUT US
            </Typography>

            <Accordion className={classes.accor}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Who we are ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption">
                  We are SD1, a team from HCMUS, VNU.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accor}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>The idea</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam dicta eligendi ipsum. Alias, labore commodi!
                  Blanditiis vero ipsum veritatis quidem.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accor}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Contact us</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display="flex"
                  style={{ width: "100%" }}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box>
                    <Box
                      display="flex"
                      justifyContent="row"
                      alignItems="center"
                    >
                      <span className={classes.icon}>
                        <PhoneIcon />
                      </span>
                      <span className={classes.infor}>(+84) 123456789</span>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="row"
                      alignItems="center"
                    >
                      <span className={classes.icon}>
                        <MailIcon />
                      </span>
                      <span className={classes.infor}>
                        tonguyentanphat@gmail.com
                      </span>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      justifyContent="row"
                      alignItems="center"
                      className={classes.contact}
                      onClick={() =>
                        window.open("https://fb.com/tanphat.tonguyen", "_blank")
                      }
                    >
                      <span className={classes.icon}>
                        <FacebookIcon />
                      </span>
                      <span className={classes.infor}>
                        fb.com/tanphat.tonguyen
                      </span>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="row"
                      alignItems="center"
                      className={classes.contact}
                      onClick={() =>
                        window.open("https://github.com/tntphat", "_blank")
                      }
                    >
                      <span className={classes.icon}>
                        <GitHubIcon />
                      </span>
                      <span className={classes.infor}>github.com/tntphat</span>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid item sm={1} xs={false} />
      </Grid>
    </Paper>
  );
}
