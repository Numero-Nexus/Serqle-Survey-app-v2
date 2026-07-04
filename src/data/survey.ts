import type { Survey } from "@/engine";
import type { LucideIcon } from "lucide-react";
import {
  Coffee, Users, Camera, Mic2, BookOpen, ChefHat,
  CalendarClock, Dice5, Flame, Target, Trophy,
  Headphones, PartyPopper, Wand2, ImageIcon,
  Trees, Pizza, Ticket,
  Meh, Car, UsersRound, VenetianMask,
  MessageCircleQuestion, PersonStanding, Puzzle,
  Circle, ThumbsUp, HelpCircle, X,
  Wallet, CreditCard, Home,
} from "lucide-react";

export interface ChoiceOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface SingleChoiceConfig {
  prompt: string;
  options: ChoiceOption[];
}

export interface MultiChoiceConfig extends SingleChoiceConfig {
  maxSelections: number;
}

/**
 * "Free Time, Fast Choices" — finalized behavioural survey instrument (v3).
 * Content transcribed verbatim (icons substituted for original emoji cues)
 * from the research design document. Randomization, implicit signal logging,
 * and attention-check scoring are intentionally NOT implemented here — out
 * of scope for this phase.
 */
export const freeTimeSurvey: Survey = {
  id: "free-time-fast-choices-v3",
  screens: [
    // Screen 2 — Ideal Free Time
    {
      id: "screen-2-ideal-free-time",
      questions: [
        {
          id: "s2-ideal-free-time",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Which sounds most like your ideal free afternoon?",
            options: [
              { value: "cafe", label: "Wandering into a new café", icon: Coffee },
              { value: "active-others", label: "Staying active with others", icon: Users },
              { value: "photo-walk", label: "A photography walk somewhere new", icon: Camera },
              { value: "big-hangout", label: "A big lively hangout", icon: Mic2 },
              { value: "read-alone", label: "Reading at the park, alone", icon: BookOpen },
              { value: "cook-new", label: "Cooking something new at home", icon: ChefHat },
            ],
          } satisfies SingleChoiceConfig,
        },
      ],
    },

    // Screen 3 — Decision Style
    {
      id: "screen-3-decision-style",
      questions: [
        {
          id: "s3-planning",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Plans set in advance vs. Decide last minute",
            options: [
              { value: "advance", label: "Plans set in advance", icon: CalendarClock },
              { value: "last-minute", label: "Decide last minute", icon: Dice5 },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "s3-popularity",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Go where everyone's going vs. Go where it fits me",
            options: [
              { value: "popular", label: "Go where everyone's going", icon: Flame },
              { value: "fits-me", label: "Go where it fits me", icon: Target },
            ],
          } satisfies SingleChoiceConfig,
        },
      ],
    },

    // Screen 4 — Micro-Scenarios, Set A (Cards 1–4)
    {
      id: "screen-4-micro-scenarios-a",
      questions: [
        {
          id: "card-1",
          type: "single-choice",
          required: true,
          config: {
            prompt: "You suddenly have a free Saturday afternoon. Pick one:",
            options: [
              { value: "coffee-friend", label: "Grab coffee with one close friend", icon: Coffee },
              { value: "pickup-game", label: "Join a pickup game with a group", icon: Trophy },
              { value: "bookstore-alone", label: "Browse a bookstore alone", icon: BookOpen },
              { value: "new-restaurant", label: "Try a new restaurant across town", icon: Pizza },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-2",
          type: "single-choice",
          required: true,
          config: {
            prompt: "It's raining all weekend. Pick one:",
            options: [
              { value: "usual-thing", label: "Stay in, do your usual thing", icon: Headphones },
              { value: "small-hangout", label: "A small hangout at someone's place", icon: PartyPopper },
              { value: "cook-new-2", label: "Try cooking something new", icon: Wand2 },
              { value: "indoor-new-spot", label: "Visit an indoor spot you've never been", icon: ImageIcon },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-3",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Money's tight this month. What sounds best?",
            options: [
              { value: "free-walk", label: "A free walk in a new neighbourhood", icon: Trees },
              { value: "secondhand-bookstore", label: "A cheap secondhand bookstore trip", icon: BookOpen },
              { value: "casual-hangout", label: "A casual low-cost hangout", icon: Pizza },
              { value: "stretch-budget", label: "Something bigger, worth stretching the budget for", icon: Ticket },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-4",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Two free hours just opened up, but nothing's perfect. Pick the least-bad option:",
            options: [
              { value: "nearby-uninteresting", label: "Something nearby that doesn't really interest you", icon: Meh },
              { value: "exciting-far", label: "Something exciting, 40 minutes away", icon: Car },
              { value: "cheap-crowded", label: "Something cheap, but likely to be crowded", icon: UsersRound },
              { value: "quiet-pricier", label: "Something quiet, but pricier than you'd like", icon: VenetianMask },
            ],
          } satisfies SingleChoiceConfig,
        },
      ],
    },

    // Screen 5 — Micro-Scenarios, Set B (Cards 5–8)
    {
      id: "screen-5-micro-scenarios-b",
      questions: [
        {
          id: "card-5",
          type: "single-choice",
          required: true,
          config: {
            prompt: 'A friend texts: "free today?" What do you say yes to?',
            options: [
              { value: "small-close", label: "Something small and close by", icon: PersonStanding },
              { value: "bigger-drive", label: "Something bigger, worth the drive", icon: Car },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-6",
          type: "single-choice",
          required: true,
          config: {
            prompt: "You only have one free hour. Pick one:",
            options: [
              { value: "one-on-one", label: "A quick one-on-one catch-up", icon: Users },
              { value: "big-group", label: "Dropping into a bigger group thing", icon: PartyPopper },
              { value: "solo-activity", label: "A short solo activity nearby", icon: Puzzle },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-7",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Your weekend plans just unexpectedly opened up. Pick one:",
            options: [
              { value: "coffee-friend-2", label: "Coffee with one close friend", icon: Coffee },
              { value: "pickup-game-2", label: "A pickup game with a group", icon: Trophy },
              { value: "book-alone", label: "Time alone with a book", icon: BookOpen },
              { value: "new-place", label: "Trying a new place across town", icon: Pizza },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "card-8",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Quick check: tap the blue circle to continue.",
            options: [
              { value: "blue", label: "Blue circle", icon: Circle },
              { value: "green", label: "Green circle", icon: Circle },
              { value: "yellow", label: "Yellow circle", icon: Circle },
              { value: "red", label: "Red circle", icon: Circle },
            ],
          } satisfies SingleChoiceConfig,
        },
      ],
    },

    // Screen 6 — Reflection
    // NOTE: Spec requires the referenced "last pick" be randomly selected per
    // participant from {Card 1,2,3,4,5,7} (never Card 6). Randomization is out
    // of scope for this phase, so this is fixed to reference Card 1 for now.
    {
      id: "screen-6-reflection",
      questions: [
        {
          id: "s6-confidence",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Thinking about your last pick — how sure were you?",
            options: [
              { value: "very-sure", label: "Very sure", icon: Target },
              { value: "kind-of", label: "Kind of", icon: MessageCircleQuestion },
              { value: "guessing", label: "Just guessing", icon: Dice5 },
            ],
          } satisfies SingleChoiceConfig,
        },
        {
          id: "s6-would-invite",
          type: "single-choice",
          required: true,
          config: {
            prompt: "Would you drag a friend along?",
            options: [
              { value: "definitely", label: "Definitely", icon: ThumbsUp },
              { value: "maybe", label: "Maybe", icon: HelpCircle },
              { value: "solo", label: "Nah, solo mission", icon: X },
            ],
          } satisfies SingleChoiceConfig,
        },
      ],
    },

    // Screen 7 — Quick Context Tags
    {
      id: "screen-7-context-tags",
      questions: [
        {
          id: "s7-context-tags",
          type: "multi-choice",
          required: true,
          config: {
            prompt: "Last one — pick what's true for you:",
            maxSelections: 2,
            options: [
              { value: "tight-budget", label: "I stick to a tight budget", icon: Wallet },
              { value: "travel-ok", label: "I don't mind travelling for something good", icon: Car },
              { value: "stay-close", label: "I prefer staying close to home", icon: Home },
              { value: "money-not-factor", label: "Money's not usually the deciding factor", icon: CreditCard },
            ],
          } satisfies MultiChoiceConfig,
        },
      ],
    },
  ],
};