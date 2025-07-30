export interface Announcement {
  id: string
  title: string
  body: string
  date: string // YYYY-MM-DD format for easy sorting
}

const announcementsData: Announcement[] = [
    {
      id: "announcement-5",
    title: "Upgrading server",
    body: "Season 3 will update the server to the latest version! Season 3 will be Origins",
    date: "2025-07-30",
  },
  {
      id: "announcement-4",
    title: "Season 3 Info",
    body: "upgrading to  CPU: Ryzen 7900 @ 3.7 / 5.4Ghz RAM: 5 GB DDR5 4800MHz, NETWORK: Intel X550T 10 Gigabit Network Card, MOTHERBOARD: ASRockRack B650D4U, OS: Rocky Linux 8",
    date: "2025-07-29",
  },
  {
    id: "announcement-3",
    title: "Server Update: 1.21.7 Compatibility!",
    body: "We've successfully updated the server to be fully compatible with Minecraft version 1.21.7! Enjoy all the new features and bug fixes. As always, all clients are supported.",
    date: "2025-07-10",
  },
  {
    id: "announcement-2",
    title: "New Community Event Coming Soon!",
    body: "Get ready for our next big community event! Details will be announced shortly. Prepare for some fun challenges and awesome rewards!",
    date: "2025-06-25",
  },
  {
    id: "announcement-1",
    title: "Welcome to Concord SMP!",
    body: "A big welcome to all new players! We're excited to have you join our peaceful and creative community. Remember to check out the rules and feel free to explore.",
    date: "2025-06-01",
  },
]

export function getAnnouncements(): Announcement[] {
  // Sort announcements by date in descending order (newest first)
  return [...announcementsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
