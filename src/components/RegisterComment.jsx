import { useState } from 'react';

function RegisterComment({ onAdd, nameRef }) {
    const [form, setForm] = useState({
        name: '',
        body: '',
        rating: 1,
        approved: false
    });
    const [err, setErr] = useState('');

    const handleSubmit = () => {
        if (!form.name.trim()) { setErr('Name must not be empty'); return; }
        if (form.rating < 1 || form.rating > 5) { setErr('Rating must be between 1 and 5'); return; }
        setErr('');
        onAdd({ ...form, rating: Number(form.rating) });
        setForm({ name: '', body: '', rating: 1, approved: false });
        if (nameRef.current) nameRef.current.focus();
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <h2>Register New Comment</h2>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <input ref={nameRef} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br /><br />
            <textarea placeholder="Body" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} /><br /><br />
            <input type="number" placeholder="Rating (1-5)" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} /><br /><br />
            <label><input type="checkbox" checked={form.approved} onChange={e => setForm({ ...form, approved: e.target.checked })} /> Approved</label><br /><br />
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default RegisterComment;