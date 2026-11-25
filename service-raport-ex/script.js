function init() {
  const ticketListEl = document.querySelector("#ticket-list");
  const filtersFormEl = document.querySelector("#filters-form");

  const newTickets = tickets.map(createNewTicket);

  function renderTicketList(tickets) {
    ticketListEl.textContent = "";

    tickets.forEach(ticket => {
      const ticketItemNode = createTicketItem(ticket);
      ticketListEl.append(ticketItemNode);
    })
  }

  function initFiltersForm() {
    const filterStatusEl = document.querySelector("#status-filter");

    filterStatusEl.addEventListener("change", () => {
      filtersFormEl.requestSubmit();
    })
    filtersFormEl.addEventListener("submit", handleFiltersSubmit);
  }

  function handleFiltersSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    const { search: query, status } = formObject;

    const filters = {
      query,
      status,
    }

    updateTicketList(newTickets, filters);
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

  function updateTicketList(tickets, filters = null) {
    let selectedTickets = [...tickets];

    if (filters !== null) {
      const normalizedQueryFilter = filters?.query.trim().toLowerCase() ?? "";

      if (normalizedQueryFilter.length > 0) {
        selectedTickets = selectedTickets.filter(ticket => {
          const normalizedTicketName = ticket.title.toLowerCase();
          return normalizedTicketName.includes(normalizedQueryFilter);
        });
      }

      if (filters?.status && filters.status !== "all") {
        selectedTickets = selectedTickets.filter(ticket => ticket.status === filters.status);
      }
    }

    renderTicketList(selectedTickets);
  }

  renderTicketList(newTickets);
  initFiltersForm();
}

init();


