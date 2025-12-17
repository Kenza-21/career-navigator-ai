import { motion } from "framer-motion";
import { MapPin, Building2, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  date?: string;
  matchScore?: number;
  url?: string;
  source?: string;
  delay?: number;
}

export function JobCard({
  title,
  company,
  location,
  date,
  matchScore,
  url,
  source,
  delay = 0,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title & Company */}
          <h4 className="font-semibold text-foreground truncate mb-1">{title}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Building2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{company}</span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            )}
            {source && (
              <Badge variant="secondary" className="text-xs">
                {source}
              </Badge>
            )}
          </div>
        </div>

        {/* Match Score & Action */}
        <div className="flex flex-col items-end gap-2">
          {matchScore !== undefined && (
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              matchScore >= 80 ? "bg-success/10 text-success" :
              matchScore >= 60 ? "bg-primary/10 text-primary" :
              matchScore >= 40 ? "bg-warning/10 text-warning" :
              "bg-muted text-muted-foreground"
            }`}>
              {matchScore}%
            </div>
          )}
          {url && (
            <Button variant="ghost" size="sm" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default JobCard;