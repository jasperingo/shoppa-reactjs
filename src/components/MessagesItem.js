
import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../icons/CheckIcon';

export default function MessagesItem({ href, message: { id, date, sender_name, sender_photo, unread_messages_count, last_message, last_message_status}}) {
  return (
    <li className="pb-4">
      <Link to={href} className="flex items-start gap-2 py-2 px-1 hover:bg-color-gray-h">
        <img 
          src={`/photos/${sender_photo}`}
          alt="message" 
          width="50" 
          height="50" 
          className="w-10 h-10 rounded-full"
          />
        <div className="flex-grow">
          <div className="flex gap-2">
            <span className="font-bold flex-grow truncate w-10">{ sender_name }</span>
            <span className="text-color-gray text-sm">{ date }</span>
          </div>
          <div className="flex gap-2 items-start">
            <CheckIcon classList="text-blue-500" />
            <div className="flex-grow truncate text-color-gray w-10">{ last_message }</div>
            <div className="px-2 py-0.5 text-sm text-white bg-color-primary rounded-full">{ unread_messages_count }</div>
          </div>
        </div>
      </Link>
    </li>
  );
}
