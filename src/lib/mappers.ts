function mapAnnouncement(item: any): Announcement {
  return {
    id: item.announcement_id ?? item.id,
    title: item.proposal_title ?? "",
    description: item.description ?? "",
    startDate: item.start_date ?? "",
    deadline: item.deadline ?? "",
    guidelines: item.guidelines_attachment ?? "",
    status: item.status ?? "active",
    createdAt: item.timestamp ?? new Date().toISOString(),
  };
}