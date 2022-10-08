import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import Card from '@/Components/Card';
import Paginator from '../Components/Paginator';

export default function Homepage(props) {
    console.log(props)
    return (
        <>
            <div className='min-h-screen'>
                <Navbar user={props.auth.user} />
                <Head title={props.title} />
                <div className='p-6 flex items-center m-4 flex-col lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center lg:gap-6'>
                    <Card news={props.news.data} />
                </div>
                <div className='text-center flex justify-center items-center m-4 '>
                    <Paginator page={props.news.meta.links} />
                </div>
            </div>
        </>
    );
}
