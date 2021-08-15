import { useAuthUser } from 'use-eazy-auth'
import { setNeedReload } from '../state'

export default function TodoItem({ item }) {
    const { token } = useAuthUser()
    function delete_item() {
        fetch(`/items/${item.id}`, {
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then(function (response) {
                const status = response.status;
                if (status === 204) {
                    setNeedReload(1);
                    console.log("Success");
                }
                else {
                    alert(`Failed, status code: ${status}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    function finish_item() {
        fetch(`/items/${item.id}/finish/`, {
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
                if (status === 200) {
                    setNeedReload(1);
                    console.log("Success");
                }
                else {
                    alert(`Failed, status code: ${status}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <div className="list-group-item" id={item.id}>
            <div style={{ top: 0, right: 0, position: "absolute" }}>
                <button className="btn-danger" onClick={delete_item} >delete</button>
                <button className="btn-success" onClick={finish_item} >finish</button>
            </div>
            <div>
                <span className="mr-3">📝</span>
                <b>{item.title}</b>
            </div>
            <div>
                <span className="mr-3">🚩</span>
                <b>{item.status}</b>
            </div>
            {item.due_time && (
                <div>
                    <span className="mr-3">⏳</span>
                    <b>{item.due_time}</b>
                </div>
            )}
        </div>
    )
}