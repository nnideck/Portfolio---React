import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IFormProjects, useAdminProjContext } from "../Contexts/adminProjContext";


const ModalDelete = forwardRef((_, ref) => {
    const { saving, getListProjects, deleteProject } =
        useAdminProjContext();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    function FillTitleDeleteModal(project: IFormProjects) {
        setId(project.id!);
        setTitle(project.title);
        handleShow();
    }

    useImperativeHandle(ref, () => {
        return { FillTitleDeleteModal };
    });

    const handleDelete = async (e: any) => {
        console.log(id);
        e.preventDefault();
        if (id) {
            await deleteProject(id);
        }
        handleClose();
        getListProjects();
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Form noValidate onSubmit={handleDelete}>
                    <br />
                    <Modal.Header closeButton>
                        <Modal.Title>Delete project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete {title}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" disabled={saving} onClick={handleDelete}>
                            Yes!
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
});

export default ModalDelete;


