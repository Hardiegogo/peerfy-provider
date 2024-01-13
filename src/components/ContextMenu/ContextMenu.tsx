import "./contextMenu.css";

interface IContextMenu {
  show: boolean;
  x: number;
  y: number;
  handleContextMenuOption: any;
}

const ContextMenu = ({ show, x, y, handleContextMenuOption }: IContextMenu) => {
  return show ? (
    <div className="context-menu " style={{ top: y, left: x }}>
      <div onClick={() => handleContextMenuOption("Add Comment")}>
        Add Comment
      </div>
      <div onClick={() => handleContextMenuOption("Add Screenshot")}>
        Add Screenshot
      </div>
      <div onClick={() => handleContextMenuOption("Add Voice Note")}>
        Add Voice Note
      </div>
      <div onClick={() => handleContextMenuOption("Add Issue Ticket")}>
        Create Ticket
      </div>
    </div>
  ) : null;
};

export default ContextMenu;
