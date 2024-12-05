import React from "react";
import { motion } from "framer-motion";

export const Divider = () => (
  <motion.div
    style={{
      width: "50px",
      height: "5px",
      background: "linear-gradient(135deg, #3c82f6, #9147ff)",
      borderRadius: "2px",
      margin: "2rem auto",
    }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  ></motion.div>
);

export default Divider;
