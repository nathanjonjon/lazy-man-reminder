import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import TodoItem from '../components/TodoItem'
import DateTimePicker from 'react-datetime-picker';
import '../components/modal.css'
import Modal from 'react-modal';
import { useForm } from "react-hook-form"

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

const ItemState = rj({
    effectCaller: rj.configured(),
    effect: (token) => (search = '') =>
        ajax.getJSON(`/items/?search=${search}`, {
            Authorization: `Bearer ${token}`,
        }),
})


export default function Todolist() {
    const { user, token } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [{ data: items }] = useRunRj(ItemState, [search], false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm()
    const [value, onChange] = useState(new Date());

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
        d.due_time = value
        fetch("/items/", {
            body: JSON.stringify(d), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(function (response) {
                const status = response.status;
                if (status === 201) {
                    console.log("Success")
                    closeModal()
                }
                else {
                    alert(`Failed, status code: ${status}`)
                }
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
                    <button onClick={logout}>Log Out</button>
                    <button onClick={openModal}>Add Todo</button>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add Todo Modal"
                >
                    <div className="mymodal">
                        <button className="close-btn" type="button" onClick={closeModal}>close</button>
                        <h3>Anything in mind?</h3>
                        <p>add new todo item and set a deadline</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title")} placeholder="Untitled" />
                        <DateTimePicker
                            onChange={onChange}
                            value={value}
                        />
                        <input type="submit" />
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