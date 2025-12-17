import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/cards/JobCard";
import { Search, Briefcase, MapPin, Loader2 } from "lucide-react";

// Sample job data for demonstration
const sampleJobs = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "Tech Morocco",
    location: "Casablanca",
    date: "Il y a 2 jours",
    matchScore: 92,
    source: "LinkedIn",
    url: "#",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Finance Plus",
    location: "Rabat",
    date: "Il y a 3 jours",
    matchScore: 85,
    source: "ReKrute",
    url: "#",
  },
  {
    id: 3,
    title: "Chef de Projet Digital",
    company: "Digital Agency MA",
    location: "Marrakech",
    date: "Il y a 1 jour",
    matchScore: 78,
    source: "Indeed",
    url: "#",
  },
  {
    id: 4,
    title: "Ingénieur DevOps",
    company: "Cloud Solutions",
    location: "Casablanca",
    date: "Aujourd'hui",
    matchScore: 88,
    source: "Stagiaires.ma",
    url: "#",
  },
];

export default function Assistant() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof sampleJobs>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter jobs based on query (simulated)
    const filtered = sampleJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered.length > 0 ? filtered : sampleJobs);
    setIsSearching(false);
  };

  const suggestions = [
    "Développeur web à Casablanca",
    "Stage marketing digital Rabat",
    "Data scientist junior",
    "Chef de projet IT",
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
          <div className="w-16 h-16 gradient-coach rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Assistant Recherche d'Emploi
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Décrivez le poste que vous recherchez en langage naturel et trouvez les meilleures offres.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ex: Je cherche un poste de développeur Python à Casablanca..."
                className="pl-12 h-14 rounded-xl border-border bg-background/50 text-base"
              />
            </div>
            <Button
              variant="coach"
              size="lg"
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="h-14 px-8"
            >
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Rechercher
                </>
              )}
            </Button>
          </div>

          {/* Suggestions */}
          {!hasSearched && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(suggestion);
                    }}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isSearching ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Recherche en cours...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {results.length} offre{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    Maroc
                  </div>
                </div>

                <div className="space-y-4">
                  {results.map((job, index) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}