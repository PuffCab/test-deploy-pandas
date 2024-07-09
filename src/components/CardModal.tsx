import { Button, Modal } from "react-bootstrap";

type CardModalProps = {
  name: string;
  species: string;
  gender: string;
  show: boolean;
  handleClose: () => void;
};

function CardModal({
  name,
  species,
  gender,
  show,
  handleClose,
}: CardModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Species:{species}</p>
        <p>Gender:{gender}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;
