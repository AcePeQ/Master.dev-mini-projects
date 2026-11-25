const tickets = [
  {
    id: 1, title: "Brak dostępu", status: "open",
    priority: 0, estimatedHours: 0, assignee: { name: "Ola" }
  },
  {
    id: 2, title: "Błąd płatności", status: "in_progress",
    priority: 1, estimatedHours: 3, assignee: { name: "Jan" }
  },
  {
    id: 3, title: "Zmiana adresu", status: "closed",
    priority: 2, estimatedHours: 2, assignee: { name: "Ola" }
  },
  {
    id: 4, title: "Problem z logowaniem", status: "open",
    priority: null, estimatedHours: null, assignee: null
  },
  {
    id: 5, title: "Poprawka tekstu", status: "open",
    priority: 3
  },
  {
    id: 6, title: "Brak zdjęcia", status: "closed",
    priority: 1, estimatedHours: 0
  }
];

function buildServiceReport(tickets) {
  const newTickets = tickets.map(createNewTicket);

  const totalCount = newTickets.length;
  const activeCount = newTickets.filter(ticket => ticket.status === "open" || ticket.status === "in_progress").length;
  const urgentCount = newTickets.filter(ticket => (ticket.priority === 0 || ticket.priority === 1) && (ticket.status === "open" || ticket.status === "in_progress")).length;
  const totalEstimatedHours = newTickets.reduce((acc, ticket) => {
    const isActive =
      ticket.status === "open" || ticket.status === "in_progress";

    return isActive ? acc + ticket.estimatedHours : acc;
  }, 0);

  const byStatus = newTickets.reduce((acc, ticket) => {
    acc[ticket.status] += 1

    return acc;
  }, {
    open: 0,
    in_progress: 0,
    closed: 0
  })

  const summary = {
    totalCount,
    activeCount,
    urgentCount,
    totalEstimatedHours,
    byStatus
  }

}

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

console.log(buildServiceReport(tickets));

function getActiveTickets(tickets) {
  return tickets.filter(ticket => {
    const isActive = ticket.status === "open" || "in_progress";

    return isActive;
  });
}

console.log(getActiveTickets(tickets));