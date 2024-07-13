import RegForm from "../RegForm";
import { useLocation } from "react-router-dom";

const EditPerson = () => {
  const id = useLocation().pathname.split("/").splice(-1)[0];

  return <RegForm route={`/api/persons/${id}/`} kind={id} />;
};

export default EditPerson;
