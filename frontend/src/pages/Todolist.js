import { useEffect, useState } from 'react'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import TodoItem from '../components/TodoItem'
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useForm } from "react-hook-form"
import { useGlobalState, setNeedReload } from '../state'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export default function Todolist() {
    const { user, token } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [needReload] = useGlobalState('needReload')
    const [items, setItems] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm()
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        fetch(`/items/?search=${search}`, {
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setItems(data)
                setNeedReload(0)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [search, needReload, token])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }


    const onSubmit = (d) => {
        if (!d.title) {
            d.title = "Untitled";
        }
        d.due_time = value
        fetch("/items/", {
            body: JSON.stringify(d),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then(function (response) {
                const status = response.status;
                if (status === 201) {
                    setNeedReload(1)
                    console.log("Success")
                    closeModal()
                }
                else {
                    alert(`Failed, status code: ${status}`)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <div className="row mt-2 p-2">
            <div className="col-md-6 offset-md-3">
                <div className="mb-3 text-center">
                    <h1>
                        📙 Lazy Man Reminder of <i>@{user.username}</i>
                    </h1>
                </div>
                <div className="text-right">
                    <button className="btn-secondary" onClick={logout}>Log Out</button>
                    <button className="btn-warning" onClick={openModal}>Add Todo</button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add Todo Modal"
                >
                    <div className="mymodal">
                        <button className="btn-close" type="button" style={{ top: 0, right: 0, position: "absolute" }} onClick={closeModal}></button>
                        <h3>Anything in mind?</h3>
                        <p>add new todo item and set a deadline</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title")} placeholder="Untitled" />
                        <DateTimePicker
                            onChange={onChange}
                            value={value}
                        />
                        <input type="submit" className="btn-warning" />
                    </form>
                </Modal>


                <div className="mt-2">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for a title"
                        style={{ fontSize: 22 }}
                        className="form-control"
                    />
                </div>
                <div className='list-item mt-5'>
                    {items &&
                        items.map((item) => (
                            <TodoItem key={item.id} item={item} />
                        ))}
                </div>
            </div>
        </div >
    )
}