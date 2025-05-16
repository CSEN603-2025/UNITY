export function getStudents() {
  return [
    {
      id: 101,
      name: "Ahmed Khalil",
      major: "Computer Science",
      status: "Enrolled",
      reports: [
        { title: "Week 1 Report", date: "2025-06-10" },
        { title: "Week 2 Report", date: "2025-06-17" }
      ]
    },
    {
      id: 102,
      name: "Yousef Hazem",
      major: "Business Informatics",
      status: "Completed",
      reports: [
        { title: "Final Report", date: "2025-07-15" }
      ]
    },
    {
        id: 103,
      name: "nadiem Ahmed",
      major: "Computer Science",
      status: "Enrolled",
      reports: [
        { title: "Week 1 Report", date: "2025-09-10" },
        { title: "Week 2 Report", date: "2025-09-17" }
      ]
    }
  ];
}
