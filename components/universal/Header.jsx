"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "IPR Services", href: "/ipr" },
  { name: "Innovation", href: "/innovation" },
  { name: "Startups", href: "/startups" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-white/10 bg-[#0a0613]/90 shadow-lg backdrop-blur-md"
            : "bg-gradient-to-r from-[#0a0613]/80 to-[#150d27]/80 backdrop-blur-sm"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ededee] to-[#bababb] shadow-lg">
                    <Image src="https://i.ibb.co/wh4CtXq7/RIISE-Logo-White.png" alt="RIISE Logo" width={40} height={40} className="h-10 w-10" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">
                    RIISE Portal
                  </span>
                  <span className="-mt-1 text-xs text-white/60">
                    Research • Innovation • IPR • Startups
                  </span>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map(item => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    {hoveredItem === item.name && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="hidden items-center space-x-3 lg:flex"
              variants={itemVariants}
            >
              <motion.button
                className="rounded-lg p-2 text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

             

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/login"
                  className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] hover:from-[#9b87f5]/90 hover:to-[#7c3aed]/90"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.button
              className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed right-4 top-16 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0613] to-[#150d27] shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                <div className="space-y-1">
                  {navItems.map(item => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="space-y-3 border-t border-white/10 pt-6"
                  variants={mobileItemVariants}
                >
                  
                  <Link
                    href="/login"
                    className="block w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] py-3 text-center font-medium text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
