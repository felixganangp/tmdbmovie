import type { LucideIcon } from 'lucide-react';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export type Category = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export type Categories = {
  key: Category;
  icon: LucideIcon;
  label: string;
};
