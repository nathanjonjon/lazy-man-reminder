export default function ContactCard({ item }) {
    return (
        <div className="list-group-item">
            <div>
                <span className="mr-3">🧑</span>
                <b>{item.title}</b>
            </div>
            <div>
                <span className="mr-3">📞</span>
                <b>{item.title}</b>
            </div>
            {item.due_time && (
                <div>
                    <span className="mr-3">✉️</span>
                    <b>{item.due_time}</b>
                </div>
            )}
            {item.due_time && <p className='mb-0 mt-2'>{item.due_time}</p>}
        </div>
    )
}