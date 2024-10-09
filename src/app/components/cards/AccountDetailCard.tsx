import React from "react";
import { MdContentCopy, MdEdit } from "react-icons/md";

interface AccountDetailCardProps {
  title: string;
  value: string;
  onCopy: () => void;
  isEditing: boolean;
  onEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountDetailCard = ({
  title,
  value,
  onCopy,
  isEditing,
  onEdit,
  onInputChange,
}: AccountDetailCardProps) => (
  <div className="mt-6">
    <span className="text-[20px] font-bold text-custom-lime">{title}</span>
    <div className="flex items-center justify-between mt-2">
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={onInputChange}
          className="w-full text-black p-2 pr-4 rounded"
          aria-label={`Edit ${title}`}
        />
      ) : (
        <span>{value}</span>
      )}
      <div className="flex items-center">
        {title === "Alias" && (
          <MdEdit
            className="text-custom-lime cursor-pointer ml-2 mr-2"
            style={{ width: "24px", height: "24px" }}
            onClick={onEdit}
            aria-label={`Edit ${title}`}
          />
        )}
        <MdContentCopy
          className="text-custom-lime cursor-pointer"
          style={{ width: "24px", height: "24px" }}
          onClick={onCopy}
          aria-label={`Copy ${title}`}
        />
      </div>
    </div>
  </div>
);

export default AccountDetailCard;
