import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard";
import Dropdown from "./Dropdown";
import BacklogIcon from "./icons/Backlog.js";
import TodoIcon from "./icons/Todo.js";
import InProgressIcon from "./icons/InProgress.js";
import DoneIcon from "./icons/Done.js";
import CanceledIcon from "./icons/Canceled.js";
import AddIcon from "./icons/Add.js";
import DotIcon from "./icons/Dot.js";
import NPIcon from "./icons/NP.js";
import LPIcon from "./icons/LP.js";
import MPIcon from "./icons/MP.js";
import HPIcon from "./icons/HP.js";
import UPCIcon from "./icons/UPC.js";
import UPGIcon from "./icons/UPG.js";
import UserIcon from "./icons/UserIcon.js";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortedBy, setSortedBy] = useState("priority");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.tickets || !Array.isArray(data.tickets)) {
          throw new Error("Data does not contain a valid 'tickets' array");
        }
        setTickets(data.tickets);

        if (!data.users || !Array.isArray(data.users)) {
          throw new Error("Data does not contain a valid 'users' array");
        }

        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTickets();
  }, []);

  const groupTickets = () => {
    if (!users) return {};

    const userMapping = {};
    users.forEach((user) => {
      userMapping[user.id] = user.name;
    });

    let grouped = {};
    if (grouping === "status") {
      grouped = tickets.reduce((acc, ticket) => {
        const status = ticket.status || "No Status";
        acc[status] = acc[status] ? [...acc[status], ticket] : [ticket];
        return acc;
      }, {});
    } else if (grouping === "user") {
      grouped = tickets.reduce((acc, ticket) => {
        const userId = ticket.userId || "Unassigned";
        const userName = userMapping[userId] || "Unassigned";
        acc[userName] = acc[userName] ? [...acc[userName], ticket] : [ticket];
        return acc;
      }, {});
    } else if (grouping === "priority") {
      grouped = tickets.reduce((acc, ticket) => {
        const priority = ticket.priority !== undefined ? ticket.priority : 0;
        acc[priority] = acc[priority] ? [...acc[priority], ticket] : [ticket];
        return acc;
      }, {});
    }
    return grouped;
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortedBy === "priority") {
        return b.priority - a.priority;
      } else if (sortedBy === "title") {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <Dropdown
        grouping={grouping}
        setGrouping={setGrouping}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />
      <div className="kanban-columns">
        {grouping === "priority"
          ? [0, 4, 3, 2, 1].map((priority) => (
              <div className="kanban-column" key={priority}>
                <div className="kanban-header">
                  <div className="kanban-left">
                    {(() => {
                      if (priority === 0) {
                        return <NPIcon />;
                      } else if (priority === 1) {
                        return <LPIcon />;
                      } else if (priority === 2) {
                        return <MPIcon />;
                      } else if (priority === 3) {
                        return <HPIcon />;
                      } else if (priority === 4) {
                        return <UPCIcon />;
                      }
                    })()}
                    {groupedTickets[priority]?.length || 0}
                  </div>

                  <div className="kanban-actions">
                    <AddIcon />
                    <DotIcon />
                  </div>
                </div>

                {sortTickets(groupedTickets[priority] || []).map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    users={users}
                    grouping={grouping}
                  />
                ))}
              </div>
            ))
          : grouping === "status"
          ? ["Backlog", "Todo", "In progress", "Done", "Canceled"].map(
              (status) => (
                <div className="kanban-column" key={status}>
                  <div className="kanban-header">
                    <div className="kanban-left">
                      {(() => {
                        if (status === "Backlog") {
                          return <BacklogIcon />;
                        } else if (status === "Todo") {
                          return <TodoIcon />;
                        } else if (status === "In progress") {
                          return <InProgressIcon />;
                        } else if (status === "Done") {
                          return <DoneIcon />;
                        } else if (status === "Canceled") {
                          return <CanceledIcon />;
                        }
                      })()}
                      <h3>{status}</h3>
                      {groupedTickets[status]?.length || 0}
                    </div>
                    <div className="kanban-actions">
                      <AddIcon />
                      <DotIcon />
                    </div>
                  </div>

                  {sortTickets(groupedTickets[status] || []).map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      users={users}
                      grouping={grouping}
                    />
                  ))}
                </div>
              )
            )
          : Object.keys(groupedTickets).map((group) => (
              <div className="kanban-column" key={group}>
                <div className="kanban-header">
                  <div className="kanban-left">
                    <UserIcon name={group} />
                    <h3>{group}</h3>
                    {groupedTickets[group]?.length || 0}
                  </div>
                  <div className="kanban-actions">
                    <AddIcon />
                    <DotIcon />
                  </div>
                </div>
                {sortTickets(groupedTickets[group]).map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    users={users}
                    grouping={grouping}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
