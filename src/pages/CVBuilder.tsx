import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

const steps = [
  { id: 1, title: "Informations", icon: User },
  { id: 2, title: "Expérience", icon: Briefcase },
  { id: 3, title: "Formation", icon: GraduationCap },
  { id: 4, title: "Compétences", icon: Code },
  { id: 5, title: "Langues", icon: Languages },
  { id: 6, title: "Aperçu", icon: Award },
];

export default function CVBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "", position: "", startDate: "", endDate: "", description: "" }
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { id: "1", institution: "", degree: "", field: "", year: "" }
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState<{ language: string; level: string }[]>([
    { language: "", level: "" }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const addEducation = () => {
    setEducations([...educations, {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      year: ""
    }]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", level: "" }]);
  };

  const removeLanguage = (index: number) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Nom complet *</Label>
                <Input
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  placeholder="Ahmed Benjelloun"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  placeholder="ahmed@email.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="+212 6XX XXX XXX"
                />
              </div>
              <div>
                <Label>Ville</Label>
                <Input
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  placeholder="Casablanca, Maroc"
                />
              </div>
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={personalInfo.linkedin}
                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                placeholder="linkedin.com/in/votreprofil"
              />
            </div>
            <div>
              <Label>Résumé professionnel</Label>
              <Textarea
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                placeholder="Décrivez votre profil en quelques phrases..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-border rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Expérience {index + 1}</span>
                  {experiences.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Entreprise</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const updated = experiences.map(ex =>
                          ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                        );
                        setExperiences(updated);
                      }}
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                  <div>
                    <Label>Poste</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => {
                        const updated = experiences.map(ex =>
                          ex.id === exp.id ? { ...ex, position: e.target.value } : ex
                        );
                        setExperiences(updated);
                      }}
                      placeholder="Intitulé du poste"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Date de début</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = experiences.map(ex =>
                          ex.id === exp.id ? { ...ex, startDate: e.target.value } : ex
                        );
                        setExperiences(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Date de fin</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => {
                        const updated = experiences.map(ex =>
                          ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex
                        );
                        setExperiences(updated);
                      }}
                      placeholder="Présent"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => {
                      const updated = experiences.map(ex =>
                        ex.id === exp.id ? { ...ex, description: e.target.value } : ex
                      );
                      setExperiences(updated);
                    }}
                    placeholder="Décrivez vos responsabilités et réalisations..."
                    className="min-h-[100px]"
                  />
                </div>
              </motion.div>
            ))}
            <Button variant="outline" onClick={addExperience} className="w-full">
              <Plus className="w-4 h-4" />
              Ajouter une expérience
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {educations.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-border rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Formation {index + 1}</span>
                  {educations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Établissement</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = educations.map(ed =>
                          ed.id === edu.id ? { ...ed, institution: e.target.value } : ed
                        );
                        setEducations(updated);
                      }}
                      placeholder="Nom de l'établissement"
                    />
                  </div>
                  <div>
                    <Label>Diplôme</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = educations.map(ed =>
                          ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                        );
                        setEducations(updated);
                      }}
                      placeholder="Ex: Master, Licence..."
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Domaine d'étude</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => {
                        const updated = educations.map(ed =>
                          ed.id === edu.id ? { ...ed, field: e.target.value } : ed
                        );
                        setEducations(updated);
                      }}
                      placeholder="Ex: Informatique"
                    />
                  </div>
                  <div>
                    <Label>Année d'obtention</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => {
                        const updated = educations.map(ed =>
                          ed.id === edu.id ? { ...ed, year: e.target.value } : ed
                        );
                        setEducations(updated);
                      }}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <Button variant="outline" onClick={addEducation} className="w-full">
              <Plus className="w-4 h-4" />
              Ajouter une formation
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Ajouter des compétences</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Ex: Python, React, SQL..."
                />
                <Button variant="coach" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[100px] p-4 border border-dashed border-border rounded-xl">
              <AnimatePresence>
                {skills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Ajoutez vos compétences techniques et soft skills...
                  </p>
                ) : (
                  skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-end"
              >
                <div className="flex-1">
                  <Label>Langue</Label>
                  <Input
                    value={lang.language}
                    onChange={(e) => {
                      const updated = [...languages];
                      updated[index].language = e.target.value;
                      setLanguages(updated);
                    }}
                    placeholder="Ex: Français, Anglais, Arabe..."
                  />
                </div>
                <div className="flex-1">
                  <Label>Niveau</Label>
                  <Input
                    value={lang.level}
                    onChange={(e) => {
                      const updated = [...languages];
                      updated[index].level = e.target.value;
                      setLanguages(updated);
                    }}
                    placeholder="Ex: Natif, Courant, B2..."
                  />
                </div>
                {languages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </motion.div>
            ))}
            <Button variant="outline" onClick={addLanguage} className="w-full">
              <Plus className="w-4 h-4" />
              Ajouter une langue
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-20 h-20 gradient-coach rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Votre CV est prêt!
              </h3>
              <p className="text-muted-foreground mb-6">
                Téléchargez votre CV au format Word, optimisé pour les systèmes ATS.
              </p>
              <Button variant="hero" size="lg" className="w-full max-w-xs">
                <Download className="w-5 h-5" />
                Télécharger CV (DOCX)
              </Button>
            </div>

            {/* Preview Summary */}
            <div className="border border-border rounded-xl p-6 space-y-4">
              <h4 className="font-semibold">Résumé</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Nom:</span>{" "}
                  <span className="font-medium">{personalInfo.fullName || "Non renseigné"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-medium">{personalInfo.email || "Non renseigné"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expériences:</span>{" "}
                  <span className="font-medium">{experiences.filter(e => e.company).length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Formations:</span>{" "}
                  <span className="font-medium">{educations.filter(e => e.institution).length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Compétences:</span>{" "}
                  <span className="font-medium">{skills.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Langues:</span>{" "}
                  <span className="font-medium">{languages.filter(l => l.language).length}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
          <div className="w-16 h-16 gradient-user rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Créateur de CV
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Créez un CV professionnel optimisé pour le marché marocain.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="glass rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary/10"
                        : isCompleted
                        ? "text-success"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                          ? "gradient-coach"
                          : isCompleted
                          ? "bg-success"
                          : "bg-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-success-foreground" />
                      ) : (
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-primary-foreground" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap hidden sm:block">
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-1 ${
                        currentStep > step.id ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {steps[currentStep - 1].title}
          </h2>
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </Button>
          {currentStep < steps.length ? (
            <Button variant="coach" onClick={nextStep}>
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </PageLayout>
  );
}