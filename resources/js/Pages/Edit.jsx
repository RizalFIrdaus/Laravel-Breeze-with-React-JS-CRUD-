import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';

export default function Edit(props) {
    const [title, setTitle] = useState(props.portalNews.title);
    const [description, setDescription] = useState(props.portalNews.description);
    const [category, setCategory] = useState(props.portalNews.category);

    const handleSubmit = () => {
        Inertia.post('/dashboard/update', {
            id: props.portalNews.id,
            title: title,
            description: description,
            category: category
        });
        setTitle('');
        setDescription('');
        setCategory('');
    }

    useEffect(() => {
        if (!props.portalNews) {
            Inertia.get('/dashboard/edit')
        }
        console.log(props)
        return;
    })

    return (
        <>
            <div className='min-h-screen'>
                <Navbar user={props.auth.user} />
                <Head title={props.title} />
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
                                <input type="text" placeholder="Masukkan title" className="input w-full m-2 text-black bg-slate-200" onChange={(title) => setTitle(title.target.value)} defaultValue={props.portalNews.title} />
                                <input type="text" placeholder="Masukkan description" className="input w-full m-2 text-black bg-slate-200" onChange={(description) => setDescription(description.target.value)} defaultValue={props.portalNews.description} />
                                <input type="text" placeholder="Masukkan category" className="input w-full m-2 text-black bg-slate-200" onChange={(category) => setCategory(category.target.value)} defaultValue={props.portalNews.category} />
                                <Link href={route('dashboard')} className='btn btn-danger m-2'>
                                    BACK
                                </Link>
                                <button href={route('dashboard.update')} className='btn btn-primary m-2' type='submit' onClick={() => handleSubmit()}>UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

