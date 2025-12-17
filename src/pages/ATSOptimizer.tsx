import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Loader2, 
  Download,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function ATSOptimizer() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  const handleOptimize = async () => {
    if (!cvFile || !targetRole) return;
    
    setIsOptimizing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsOptimized(true);
    setIsOptimizing(false);
  };

  const optimizationFeatures = [
    "Mots-clés optimisés pour les systèmes ATS",
    "Format LaTeX professionnel",
    "Structure adaptée au marché marocain",
    "Mise en page compatible avec tous les ATS",
    "Sections optimisées pour le parsing automatique",
  ];

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 gradient-user rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Optimiseur ATS
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Transformez votre CV pour qu'il passe tous les systèmes de suivi des candidatures.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* CV Upload */}
            <div className="glass rounded-2xl p-6">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                Votre CV actuel
              </Label>
              <FileUpload
                onFileSelect={(file) => setCvFile(file)}
                accept=".pdf,.docx,.doc,.txt"
              />
            </div>

            {/* Target Role */}
            <div className="glass rounded-2xl p-6">
              <Label htmlFor="targetRole" className="text-base font-semibold text-foreground mb-4 block">
                Poste ciblé
              </Label>
              <Input
                id="targetRole"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Ex: Développeur Full Stack, Data Analyst..."
                className="h-12"
              />
            </div>

            {/* Optimize Button */}
            <Button
              variant="user"
              size="xl"
              onClick={handleOptimize}
              disabled={isOptimizing || !cvFile || !targetRole}
              className="w-full"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Optimisation en cours...
                </>
              ) : (
                <>
                  Optimiser mon CV
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Features & Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {!isOptimized ? (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Ce que vous obtiendrez
                </h3>
                <ul className="space-y-3">
                  {optimizationFeatures.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full gradient-coach flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-20 h-20 gradient-coach rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  CV Optimisé!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Votre CV a été optimisé pour le poste de "{targetRole}".
                </p>
                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full">
                    <Download className="w-5 h-5" />
                    Télécharger (PDF)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Download className="w-5 h-5" />
                    Télécharger (LaTeX)
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Astuce:</strong> Plus de 75% des CV sont rejetés par les ATS avant d'être lus par un recruteur. Notre optimiseur augmente vos chances de passage.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}