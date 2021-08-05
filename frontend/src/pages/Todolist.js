import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import TodoItem from '../components/TodoItem'
import Modal from '../components/Modal'
import useModal from '../components/useModal'

const ItemState = rj({
    effectCaller: rj.configured(),
    effect: (token) => (search = '') =>
        ajax.getJSON(`/items/?search=${search}`, {
            Authorization: `Bearer ${token}`,
        }),
})


export default function Todolist() {
    const { user } = useAuthUser()
    const { logout } = useAuthActions()
    const [search, setSearch] = useState('')
    const [{ data: items }] = useRunRj(ItemState, [search], false)
    const { toggle, visible } = useModal();
    return (
        <div className="row mt-2 p-2">
            <div className="col-md-6 offset-md-3">
                <div className="mb-3 text-center">
                    <h1>
                        📙 Lazy Man Reminder of <i>@{user.username}</i>
                    </h1>
                </div>
                <div className="text-right">
                    <button onClick={logout} className="btn btn-light">Log Out</button>
                    <button onClick={toggle} className="btn btn-light">Add Todo</button>
                    <Modal visible={visible} toggle={toggle} />
                </div>
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
        </div>
    )
}