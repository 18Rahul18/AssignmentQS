import React from "react";
import NPIcon from "./icons/NP.js";
import LPIcon from "./icons/LP.js";
import MPIcon from "./icons/MP.js";
import HPIcon from "./icons/HP.js";
import UPCIcon from "./icons/UPC.js";
import UPGIcon from "./icons/UPG.js";
import BacklogIcon from "./icons/Backlog.js";
import TodoIcon from "./icons/Todo.js";
import InProgressIcon from "./icons/InProgress.js";
import DoneIcon from "./icons/Done.js";
import CanceledIcon from "./icons/Canceled.js";
import UserIcon from "./icons/UserIcon.js";
import TagIcon from "./icons/TagIcon.js";

const TicketCard = ({ ticket, users, grouping }) => {
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <div className="ticket-card">
      <div className="user-info">
        <p>{ticket.id}</p>
        {grouping !== "user" && <UserIcon name={getUserName(ticket.userId)} />}
      </div>

      <div className="status-info">
        {grouping !== "status" && (
          <>
            {ticket.status === "Backlog" && (
              <BacklogIcon className="status-icon" />
            )}
            {ticket.status === "Todo" && <TodoIcon className="status-icon" />}
            {ticket.status === "In progress" && (
              <InProgressIcon className="status-icon" />
            )}
            {ticket.status === "Done" && <DoneIcon className="status-icon" />}
            {ticket.status === "Canceled" && (
              <CanceledIcon className="status-icon" />
            )}
          </>
        )}
        <h4>{ticket.title}</h4>
      </div>

      <div className="priority-tag">
        {grouping !== "priority" && (
          <>
            {ticket.priority === 0 && <NPIcon className="priority-icon" />}
            {ticket.priority === 1 && <LPIcon className="priority-icon" />}
            {ticket.priority === 2 && <MPIcon className="priority-icon" />}
            {ticket.priority === 3 && <HPIcon className="priority-icon" />}
            {ticket.priority === 4 && <UPGIcon className="priority-icon" />}
          </>
        )}

        <div className="tag-icon">
          <TagIcon />
          <p className="ticket-tag">{ticket.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
