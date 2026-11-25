function init() {
  const newTickets = tickets.map(createNewTicket);

  function renderTicketList(tickets) {
    const ticketListEl = document.querySelector("#ticket-list");
    ticketListEl.textContent = "";

    tickets.forEach(ticket => {
      const ticketItemNode = createTicketItem(ticket);
      ticketListEl.append(ticketItemNode);
    })
  }

  function createTicketItem(ticket) {
    const templateEl = document.querySelector("#ticket-template");
    const fragment = document.importNode(templateEl.content, true);

    const statusLabels = {
      open: "Otwarte",
      in_progress: "W trakcie",
      closed: "Zamknięte",
    };
    const priorityLabels = {
      0: "Pilny",
      1: "Wysoki",
      2: "Normalny",
      3: "Niski",
    };

    const ticketCardEl = fragment.querySelector(".ticket-card");
    ticketCardEl.dataset.ticketId = ticket.id;
    ticketCardEl.dataset.status = ticket.status;
    ticketCardEl.dataset.priority = ticket.priority;

    const statusEl = fragment.querySelector("[data-field='status']");
    statusEl.textContent = statusLabels[ticket.status];

    const priorityEl = fragment.querySelector("[data-field='priority']");
    priorityEl.textContent = priorityLabels[ticket.priority];

    const titleEl = fragment.querySelector("[data-field='title']");
    titleEl.textContent = ticket.title;

    const idEl = fragment.querySelector("[data-field='id']");
    idEl.textContent = `#${ticket.id}`;

    const assigneeEl = fragment.querySelector("[data-field='assignee']");
    assigneeEl.textContent = ticket.assigneeName;

    const hoursEl = fragment.querySelector("[data-field='hours']");
    hoursEl.textContent = ticket.estimatedHours;

    const closeButtonEl = fragment.querySelector("[data-action='close']");
    const actionLabelEl = fragment.querySelector("[data-field='action-label']");
    const isClosed = ticket.status === "closed";

    closeButtonEl.disabled = isClosed;
    closeButtonEl.setAttribute("aria-label", `Zamknij zgłoszenie ${ticket.title}`);
    actionLabelEl.textContent = isClosed ? "Zamknięte" : "Zamknij";

    return ticketCardEl;
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

  renderTicketList(newTickets);
}

init();


