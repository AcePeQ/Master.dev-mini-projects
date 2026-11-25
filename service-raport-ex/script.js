function init() {
  const newTickets = tickets.map(createNewTicket);


  function createNewTicket(ticket) {
    return {
      id: ticket.id,
      title: ticket.title,
      status: ticket.status,
      priority: ticket.priority ?? 2,
      estimatedHours: ticket.estimatedHours ?? 1,
      assigneeName: ticket.assignee?.name ?? "Nieprzypisane",
    }
  }
}