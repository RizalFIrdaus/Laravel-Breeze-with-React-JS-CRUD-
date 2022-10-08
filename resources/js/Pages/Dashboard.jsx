import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        Inertia.post('/dashboard', {
            title: title,
            description: description,
            category: category
        });
        setTitle('');
        setDescription('');
        setCategory('');
    }
    useEffect(() => {
        if (!props.dashboardNews) {
            Inertia.get('/dashboardshow')
        }
        return;
    })
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">FORM BERITA</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-2 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 ">
                        {props.flash.message &&
                            <div className="alert alert-success shadow-lg p-4 m-2 my-6 ">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            </div>
                        }
                        <div className="form">
                            <input type="text" placeholder="Masukkan title" className="input w-full m-2 text-black bg-slate-200" onChange={(title) => setTitle(title.target.value)} value={title} />
                            <input type="text" placeholder="Masukkan description" className="input w-full m-2 text-black bg-slate-200" onChange={(description) => setDescription(description.target.value)} value={description} />
                            <input type="text" placeholder="Masukkan category" className="input w-full m-2 text-black bg-slate-200" onChange={(category) => setCategory(category.target.value)} value={category} />
                            <button type='submit' className='btn btn-primary m-2' onClick={() => handleSubmit()}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12 max-w-2xl mx-auto sm:px-2 lg:px-4">
                {!props.dashboardNews || props.dashboardNews.length === 0 ?
                    <div className="alert alert-info w-full lg:w-96  sm:rounded-lg p-4 max-w-4xl mx-auto">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Data belum ada yang di posting</span>
                        </div>
                    </div>
                    : props.dashboardNews.map((data, i) => {
                        return (
                            <div key={i} className="card w-full lg:w-96 text-black shadow-xl sm:rounded-lg p-4 max-w-4xl mx-auto">
                                <div className="card-body" >
                                    <h2 className="card-title">
                                        {data.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p> {data.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">  {data.category}</div>
                                        <div className="badge badge-outline">  {data.author}</div>
                                    </div>
                                    <div className="card-actions justify-end mt-4 ">
                                        <Link className='btn btn-success text-white font-bold shadow-lg' as='button' href={route('dashboard.edit')} method='get' data={{ id: data.id }}>
                                            Update
                                        </Link>
                                        <Link className='btn btn-warning text-white font-bold shadow-lg' href={route('dashboard.delete')} as='button' method='post' data={{ id: data.id }}>
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </AuthenticatedLayout >
    );
}
