import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { ScoreRing } from "@/components/ui/score-ring";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Loader2, 
  ArrowRight,
  FileCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface EvaluationCategory {
  name: string;
  score: number;
  feedback: string;
}

interface EvaluationResult {
  overallScore: number;
  categories: EvaluationCategory[];
  summary: string;
}

const mockCategories: EvaluationCategory[] = [
  { name: "Contact et Coordonnées", score: 95, feedback: "Excellent! Toutes les informations essentielles sont présentes." },
  { name: "Résumé Professionnel", score: 75, feedback: "Bon résumé, mais pourrait être plus impactant avec des métriques." },
  { name: "Expérience Professionnelle", score: 85, feedback: "Bien structuré avec des résultats quantifiables." },
  { name: "Formation", score: 90, feedback: "Formation bien présentée et pertinente." },
  { name: "Compétences Techniques", score: 70, feedback: "Ajoutez plus de mots-clés spécifiques au domaine." },
  { name: "Compétences Linguistiques", score: 80, feedback: "Niveaux clairement indiqués." },
  { name: "Certifications", score: 60, feedback: "Envisagez d'ajouter des certifications reconnues." },
  { name: "Projets", score: 65, feedback: "Décrivez l'impact de vos projets avec des chiffres." },
  { name: "Mise en Page", score: 85, feedback: "Format clair et professionnel." },
  { name: "Longueur", score: 90, feedback: "Longueur appropriée pour votre niveau d'expérience." },
  { name: "Mots-clés ATS", score: 72, feedback: "Augmentez la densité des mots-clés pertinents." },
  { name: "Action Verbs", score: 78, feedback: "Bonne utilisation des verbes d'action." },
  { name: "Cohérence", score: 88, feedback: "Style cohérent tout au long du document." },
  { name: "Lisibilité", score: 82, feedback: "Bonne lisibilité, police et espacement appropriés." },
];

export default function ATSEvaluator() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!cvFile) return;
    
    setIsEvaluating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const avgScore = Math.round(mockCategories.reduce((acc, cat) => acc + cat.score, 0) / mockCategories.length);
    
    setResult({
      overallScore: avgScore,
      categories: mockCategories,
      summary: "Votre CV montre un bon niveau de professionnalisme. Pour améliorer votre score, concentrez-vous sur l'ajout de certifications et l'optimisation des mots-clés ATS.",
    });
    
    setIsEvaluating(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
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
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Évaluateur ATS
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Évaluation complète de votre CV avec 14 critères professionnels utilisant l'IA.
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Upload Section */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Téléchargez votre CV pour l'évaluation
              </h2>
              <FileUpload
                onFileSelect={(file) => setCvFile(file)}
                accept=".pdf,.docx,.doc,.txt"
              />
            </div>

            {/* Categories Preview */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">14 Critères d'Évaluation</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {mockCategories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                    className="p-3 rounded-xl bg-muted/50 text-center"
                  >
                    <FileCheck className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">{cat.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Evaluate Button */}
            <div className="flex justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={handleEvaluate}
                disabled={isEvaluating || !cvFile}
                className="min-w-[200px]"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Évaluation en cours...
                  </>
                ) : (
                  <>
                    Évaluer mon CV
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Overall Score */}
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Score Global
              </h2>
              <ScoreRing score={result.overallScore} size={180} strokeWidth={14} />
              <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
                {result.summary}
              </p>
            </div>

            {/* Detailed Categories */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-6">Détail par Catégorie</h3>
              <div className="space-y-3">
                {result.categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedCategory(
                        expandedCategory === category.name ? null : category.name
                      )}
                      className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="font-medium text-foreground">{category.name}</span>
                        <div className="flex-1 max-w-[200px] hidden sm:block">
                          <Progress 
                            value={category.score} 
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                        {expandedCategory === category.name ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                    
                    {expandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                          {category.feedback}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setResult(null);
                  setCvFile(null);
                }}
              >
                Nouvelle évaluation
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}