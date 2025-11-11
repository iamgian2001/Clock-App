import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion } from "framer-motion";
import { useState } from "react";
import Timer from "../components/Timer";

export default function AccordionExpandIcon({ timerNumber }) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      expanded={open}
      onChange={() => setOpen(!open)}
      disableGutters
      sx={{ mb: 2 }}
    >
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: "lightblue" }}
      >
        <Typography component="span">Timer {timerNumber}</Typography>
      </AccordionSummary>

      <AccordionDetails className="bg-violet-950 h-fit">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Timer />
        </motion.div>
      </AccordionDetails>
    </Accordion>
  );
}
