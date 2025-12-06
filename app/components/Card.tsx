type CardProps = {
  createdAt: string;
  data: string;
  id: number;
  updatedAt: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onCopy?: (id: number) => void;
};

const Card = ({ data, id, updatedAt, onEdit, onDelete, onCopy }: CardProps) => {
  return (
    <div className="saved-card">
      {typeof onDelete === "function" && (
        <button className="card-btn delete-btn" onClick={() => onDelete(id)}>
          <svg fill="purple" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </button>)}

      {typeof onCopy === "function" && (
        <button className="card-btn copy-btn" onClick={() => onCopy(id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="purple">
            <path d="M16 1H4C2.895 1 2 1.895 2 3V17H4V3H16V1ZM19 5H8C6.895 5 6 5.895 6 7V21C6 22.105 6.895 23 8 23H19C20.105 23 21 22.105 21 21V7C21 5.895 20.105 5 19 5ZM19 21H8V7H19V21Z" />
          </svg>
        </button>
      )}



      <div className="saved-card-content">
        <div className="saved-card-data">{data}</div>
      </div>

      <div className="saved-card-footer-data">
        {onEdit && (<button className="saved-edit" onClick={() => onEdit(id)}>Edit</button>)}
        <span className="saved-last-modified">{new Date(updatedAt).toLocaleString()}</span>
      </div>

    </div>
  );
};

export default Card;
