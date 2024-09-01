export interface TeamMember {
  name: string;        // Team member's name
  role: string;        // Team member's role or title
  image: string;       // URL or path to the team member's image
  show?: boolean;      // Optional property to track visibility state for animation
}
