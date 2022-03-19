
import React from 'react';
import { Link } from 'react-router-dom';
import { useMessageMemberGet } from '../../hooks/message/messageMemberGetHook';
import { useDateFormatter } from '../../hooks/viewHook';
import Message from '../../models/Message';

export default function MessagesItem({ userId, chat }) {

  const dateFormatter = useDateFormatter();

  const getMember = useMessageMemberGet();
  
  const member = getMember(chat, userId);

  const message = chat.messages[0];

  return (
    <li className="pb-4">
      <Link 
        to={`/messages/${member.id}`} 
        className="flex items-start gap-2 py-2 px-1 hover:bg-color-gray-h"
        >
        <img 
          width="50" 
          height="50" 
          alt={member.name}
          src={member.photo.href}
          className="w-12 h-12 rounded-full"
          />
        <div className="flex-grow">
          <div className="flex gap-2">
            <span className="font-bold flex-grow truncate w-10">{ member.name }</span>
            <span className="text-color-gray text-sm">{ dateFormatter(message.created_at, { date: true }) }</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-grow truncate text-color-gray w-10">{ message.content }</div>
            {
              member.id === message.user_id && message.delivery_status === Message.DELIVERY_STATUS_SENT &&
              <div className="px-2 py-2 text-sm text-white bg-color-primary rounded-full"></div>
            }
          </div>
        </div>
      </Link>
    </li>
  );
}
