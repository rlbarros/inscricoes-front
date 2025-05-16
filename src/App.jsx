import React from "react";
import { motion } from "framer-motion";
import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";
import logo from "./assets/logo.png";

const App = () => {
  return (
    <div className="min-h-screen bg-theology flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <img src={logo} alt="Logo do projeto" className="logo" />
          </motion.h1>
          <motion.p
            className="mt-2 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Preencha o formulário abaixo para a pré-inscrição em nosso curso
          </motion.p>
        </div>

        <RegistrationForm />

        <motion.footer
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          © {new Date().getFullYear()} Igreja evangélica Apostólioa | v 1.0.0 |
          Todos os direitos reservados.
        </motion.footer>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default App;
