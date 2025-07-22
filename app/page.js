"use client";


import HomeDashboard from "@/components/homeComponent/homeDashboard";
import BackgroundEffect from "@/components/universal/BackGroundEffect";
import Footer from "@/components/universal/Footer";
import Header from "@/components/universal/Header";
import RIISEBotWidget from "@/components/universal/RiiseBot";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
    <Header/>

    <HomeDashboard/>
    <RIISEBotWidget/>
     <Footer/>
   

    </>
  );
}

