import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { ScoreRing } from "@/components/ui/score-ring";
import { Badge } from "@/components/ui/badge";
import { 
  FileSearch, 
  Loader2, 
  CheckCircle, 
  XCircle,
  ArrowRight
} from "lucide-react";

interface AnalysisResult {
  matchScore: number;
  commonSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export default function CVAnalyzer() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!cvFile && !jobDescription) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock result
    setResult({
      matchScore: 78,
      commonSkills: ["Python", "SQL", "Data Analysis", "Machine Learning", "Git"],
      missingSkills: ["Kubernetes", "AWS", "Scala"],
      recommendations: [
        "Ajoutez des certifications cloud (AWS/Azure) pour améliorer votre profil",
        "Mentionnez des projets concrets avec des métriques de résultats",
        "Incluez votre niveau de français et d'anglais",
      ],
    });
    
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setResult(null);
    setCvFile(null);
    setJobDescription("");
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 gradient-coach rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileSearch className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Analyseur de CV
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Comparez votre CV à une offre d'emploi et découvrez votre score de compatibilité.
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* CV Upload */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                1. Téléchargez votre CV
              </h2>
              <FileUpload
                onFileSelect={(file) => setCvFile(file)}
                accept=".pdf,.docx,.doc,.txt"
              />
            </div>

            {/* Job Description */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                2. Collez la description du poste
              </h2>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Collez ici la description complète de l'offre d'emploi..."
                className="min-h-[200px] resize-none"
              />
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!cvFile && !jobDescription)}
                className="min-w-[200px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    Analyser
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Score */}
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Score de Compatibilité
              </h2>
              <ScoreRing score={result.matchScore} size={160} strokeWidth={12} />
              <p className="mt-4 text-muted-foreground">
                {result.matchScore >= 80
                  ? "Excellent match! Votre profil correspond très bien."
                  : result.matchScore >= 60
                  ? "Bon match. Quelques améliorations possibles."
                  : "Match moyen. Consultez les recommandations ci-dessous."}
              </p>
            </div>

            {/* Skills Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Skills */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-foreground">Compétences en commun</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.commonSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-success/10 text-success border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-foreground">Compétences manquantes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-destructive/10 text-destructive border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Recommandations</h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full gradient-coach text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={resetAnalysis}>
                Nouvelle analyse
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}